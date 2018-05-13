import * as THREE from 'three';

import Box from '../../Intersect/Box';
import Point from '../../Intersect/Point';

export default class BoxPointLevel extends THREE.Group {
	static id = 'BoxPoint';

	constructor(game) {
		super();

		this.game = game;

		this.angle = 0;
		this.point = new Point(new THREE.Vector3(-0.25, 0, 0.2));
		this.box = new Box(new THREE.Vector3(2, 0.01, 2));

		this.point.createHelper();
		this.box.createHelper();

		this.add(this.point.helper);
		this.add(this.box.helper);
	}

	update(delta, elapsed) {
		if (this.hit) {
			this.remove(this.hit.helper);
			this.hit = null;
		}

		this.angle += 0.25 * Math.PI * delta;

		this.point.position.x = Math.cos(this.angle * 2.2) * 1.5;
		this.point.position.z = Math.sin(this.angle) * 1.75;
		this.point.updateHelper();

		this.hit = this.box.intersectPoint(this.point);

		if (this.hit) {
			this.add(this.hit.createHelper());
		}
	}
}