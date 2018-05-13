import * as THREE from 'three';

import Box from '../../Intersect/Box';
import Point from '../../Intersect/Point';

export default class BoxBoxLevel extends THREE.Group {
	static id = 'BoxBox';

	constructor(game) {
		super();

		this.game = game;

		this.angle = 0;
		this.box1 = new Box(new THREE.Vector3(4, 0.01, 1));
		this.box2 = new Box(new THREE.Vector3(1, 0.01, 1));
		this.box2.position.copy(new THREE.Vector3(1, 0, 0.7))

		this.box1.createHelper();
		this.box2.createHelper();

		this.add(this.box1.helper);
		this.add(this.box2.helper);
	}

	update(delta, elapsed) {
		if (this.hit) {
			this.remove(this.hit.helper);
			this.hit = null;
		}

		this.angle += 0.125 * Math.PI * delta;

		this.box2.position.x = Math.cos(this.angle + 20) * 3;
		this.box2.position.z = Math.sin(this.angle * 1.7) * 1.5;
		this.box2.updateHelper();

		this.hit = this.box1.intersectBox(this.box2);

		if (this.hit) {
			this.add(this.hit.createHelper());
		}
	}
}