import * as THREE from 'three';
import { randomColor } from '../helpers';

export default class Segment {
	constructor(position, delta) {
		this.position = position || new THREE.Vector3();
		this.delta = delta || new THREE.Vector3(1, 0, 0);
	}

	createHelper() {
		if (!this.helper) {
			this.helper = new THREE.ArrowHelper(
				this.delta,
				this.position,
				this.delta.clone().length(),
				randomColor()
			);

			console.log(this.helper);
	
			return this.helper;
		}
	}

	updateHelper() {
		this.helper.position.copy(this.position);
		this.helper.setDirection(this.delta);
		this.helper.setLength(this.delta.clone().length());
	}
}
