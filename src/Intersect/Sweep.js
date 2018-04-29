import * as THREE from 'three';

export default class Sweep {
	constructor() {
		this.hit = null;
		this.position = new THREE.Vector3();
		this.time = 1;
	}
}