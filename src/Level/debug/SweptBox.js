import * as THREE from 'three';

import Box from '../../Intersect/Box';
import Point from '../../Intersect/Point';

export default class SweptBoxLevel extends THREE.Group {
	static id = 'SweptBox';

	constructor(game) {
		super();

		this.game = game;

		this.add(new THREE.GridHelper(10, 10));

		this.angle = 0;
		this.delta = new THREE.Vector3();
		this.velocity = new THREE.Vector3(3, 0, 2.4);

		this.box = new Box(new THREE.Vector3(), new THREE.Vector3(0.5, 0.01, 0.5));

		this.walls = [
			new Box(new THREE.Vector3(-3, 0, 0), new THREE.Vector3(0.5, 0.01, 3)),
			new Box(new THREE.Vector3( 3, 0, 0), new THREE.Vector3(0.5, 0.01, 3)),
			new Box(new THREE.Vector3(0, 0 , -1.75), new THREE.Vector3(5.5, 0.01, 0.5)),
			new Box(new THREE.Vector3(0, 0,   1.75), new THREE.Vector3(5.5, 0.01, 0.5)),
		]

		this.box.createHelper();
		this.walls[0].createHelper();
		this.walls[1].createHelper();
		this.walls[2].createHelper();
		this.walls[3].createHelper();

		this.add(this.box.helper);
		this.add(this.walls[0].helper);
		this.add(this.walls[1].helper);
		this.add(this.walls[2].helper);
		this.add(this.walls[3].helper);

		this.frames = 0;
	}

	update(delta, elapsed) {
		if (this.hit) {
			this.remove(this.hit.helper);
			this.hit = null;
		}

		this.delta.copy(this.velocity.clone().multiplyScalar(delta));

		const sweep = this.box.sweepInto(this.walls, this.delta);

		if (sweep.hit) {
			this.game.state.messages.push(sweep.hit.position.toArray());
			this.velocity.reflect(sweep.hit.normal);
		}

		this.box.position.copy(sweep.position);
		this.box.updateHelper();

		this.frames += 1;

		// this.box2.position.x = Math.cos(this.angle + 20) * 3;
		// this.box2.position.z = Math.sin(this.angle * 1.7) * 1.5;
		// this.box2.updateHelper();

		// this.hit = this.box1.intersetBox(this.box2);

		// if (this.hit) {
		// 	this.add(this.hit.createHelper());
		// }
	}
}