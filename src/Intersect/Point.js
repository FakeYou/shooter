import * as THREE from 'three';

import { randomColor } from '../helpers';

export default class Point {
	constructor(position) {
		this.position = position || new THREE.Vector3();
	}

	createHelper() {
		if (!this.helper) {
			this.helper = new THREE.Mesh(
				new THREE.CylinderGeometry(0.05, 0.05, 0.0001, 5),
				new THREE.MeshBasicMaterial({ wireframe: true, color: randomColor() })
			);
			this.helper.position.copy(this.position);
		}

		return this.helper;
	}

	updateHelper() {
		if (this.helper) {
			this.helper.position.copy(this.position);
		}
	}
}
