import * as THREE from 'three';
import { clamp } from 'lodash';

import Hit from './Hit';
import Sweep from './Sweep';
import Segment from './Segment';

import { randomColor } from '../helpers';

const EPSILON = 1e-8;

export default class Box {
	constructor(position, size) {
		this.position = position;
		this.half = size.clone().multiplyScalar(0.5);
		this.size = size
	}

	createHelper() {
		if (!this.helper) {
			this.helper = new THREE.Mesh(
				new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z),
				new THREE.MeshBasicMaterial({ wireframe: true, color: randomColor() }),
			);
			this.helper.type = 'hitbox';
		}

		this.helper.position.copy(this.position);

		return this.helper;
	}

	updateHelper() {
		if (this.helper) {
			this.helper.position.copy(this.position);
		}
	}

	intersectPoint(point) {
		const dx = point.position.x - this.position.x;
		const px = this.half.x - Math.abs(dx);

		if (px <= 0) {
			return null;
		}

		const dz = point.position.z - this.position.z;
		const pz = this.half.z - Math.abs(dz);

		if (pz <= 0) {
			return null;
		}

		const hit = new Hit(this);

		if (px < pz) {
			const sx = Math.sign(dx);
			hit.delta.x = px * sx;
			hit.normal.x = sx;
			hit.position.x = this.position.x + (this.half.x * sx);
			hit.position.z = point.position.z;
		}
		else {
			const sz = Math.sign(dz);
			hit.delta.z = pz * sz;
			hit.normal.z = sz;
			hit.position.x = point.position.x;
			hit.position.z = this.position.z + (this.half.z * sz);
		}

		return hit;
	}

	intersectSegment(segment, paddingX = 0, paddingZ = 0) {
		const scaleX = 1 / segment.delta.x;
		const scaleZ = 1 / segment.delta.z;
		const signX = Math.sign(scaleX);
		const signZ = Math.sign(scaleZ);
		const nearTimeX = (this.position.x - signX * (this.half.x + paddingX) - segment.position.x) * scaleX;
		const nearTimeZ = (this.position.z - signZ * (this.half.z + paddingZ) - segment.position.z) * scaleZ;
		const farTimeX = (this.position.x + signX * (this.half.x + paddingX) - segment.position.x) * scaleX;
		const farTimeZ = (this.position.z + signZ * (this.half.z + paddingZ) - segment.position.z) * scaleZ;

		if (nearTimeX > farTimeZ || nearTimeZ > farTimeX) {
			return null;
		}

		const nearTime = Math.max(nearTimeX, nearTimeZ);
		const farTime = Math.min(farTimeX, farTimeZ);

		if (nearTime >= 1 || farTime <= 0) {
			return null;
		}

		const hit = new Hit(this);
		hit.time = clamp(nearTime, 0, 1);

		if (nearTimeX > nearTimeZ) {
			hit.normal.x = -signX;
			hit.normal.z = 0;
		}
		else {
			hit.normal.x = 0;
			hit.normal.z = -signZ;
		}

		hit.delta.x = (1 - hit.time) * -segment.delta.x;
		hit.delta.z = (1 - hit.time) * -segment.delta.z;
		hit.position.x = segment.position.x + hit.delta.x * hit.time;
		hit.position.z = segment.position.z + hit.delta.z * hit.time;

		return hit;
	}

	intersectBox(box) {
		const dx = box.position.x - this.position.x;
		const px = (box.half.x + this.half.x) - Math.abs(dx);

		if (px <= 0) {
			return null;
		}

		const dz = box.position.z - this.position.z;
		const pz = (box.half.z + this.half.z) - Math.abs(dz);

		if (pz <= 0) {
			return null;
		}

		const hit = new Hit(this);
		if (px < pz) {
			const sx = Math.sign(dx);
			hit.delta.x = px * sx;
			hit.normal.x = sx;
			hit.position.x = this.position.x + (this.half.x * sx);
			hit.position.z = box.position.z;
		}
		else {
			const sz = Math.sign(dz);
			hit.delta.z = pz * sz;
			hit.normal.z = sz;
			hit.position.x = box.position.x;
			hit.position.z = this.position.z + (this.half.z * sz);
		}

		return hit;
	}

	sweepBox(box, delta) {
		const sweep = new Sweep();

		if (delta.x === 0 && delta.z === 0) {
			sweep.position.x = box.position.x;
			sweep.position.z = box.position.z;
			sweep.hit = this.intersectBox(box);

			if (sweep.hit) {
				sweep.time = 0;
				sweep.hit.time = 0;
			}
			else {
				sweep.time = 1;
			}

			return sweep;
		}

		const segment = new Segment(box.position, delta.clone());
		sweep.hit = this.intersectSegment(segment, box.half.x, box.half.z);

		if (sweep.hit) {
			sweep.time = clamp(sweep.hit.time - EPSILON, 0, 1);
			sweep.position.x = box.position.x + delta.x * sweep.time;
			sweep.position.z = box.position.z + delta.z * sweep.time;

			const direction = delta.clone();
			direction.normalize();

			sweep.hit.position.x = clamp(
				sweep.hit.position.x + direction.x * box.half.x,
				this.position.x - this.half.x,
				this.position.x + this.half.x,
			);

			sweep.hit.position.z = clamp(
				sweep.hit.position.z + direction.z * box.half.z,
				this.position.z - this.half.z,
				this.position.z + this.half.z,
			);
		}
		else {
			sweep.position.x = box.position.x + delta.x;
			sweep.position.z = box.position.z + delta.z;
			sweep.time = 1;
		}

		return sweep;
	}

	sweepInto(colliders, delta) {
		let nearest = new Sweep();


		nearest.time = 1;
		nearest.position.x = this.position.x + delta.x;
		nearest.position.z = this.position.z + delta.z;

		for (let i = 0, il = colliders.length; i < il; i++) {
			if (colliders[i] === this) {
				continue;
			}

			const sweep = colliders[i].sweepBox(this, delta);

			if (sweep.time < nearest.time) {
				nearest = sweep;
			}
		}

		return nearest;
	}
}