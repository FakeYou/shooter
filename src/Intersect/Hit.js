import * as THREE from 'three';
import { randomColor } from '../helpers';

export default class Hit {
	constructor(collider) {
		this.collider = collider;
		this.position = new THREE.Vector3();
		this.delta = new THREE.Vector3();
		this.normal = new THREE.Vector3();
		this.time = 0;
	}

	createHelper() {
		this.helper = new THREE.ArrowHelper(
			this.delta.clone().multiplyScalar(-1),
			this.position,
			this.delta.clone().length(),
			randomColor()
		);

		return this.helper;
	}
}
