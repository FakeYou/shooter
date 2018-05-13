import * as THREE from 'three';

import { randomColor } from '../helpers';
import Box from '../Intersect/Box';

export default class Collision extends THREE.Group {
	constructor(game, map, definition) {
		super();

		this.game = game;
		this.map = map;
		this.definition = definition;
		this.size = definition.width;
		this.bodies = this.createBodies();
	}

	createBodies() {
		const bodies = [];

		this.definition.chunks.forEach((chunk) => {
			chunk.data.forEach((tile, index) => {
				if (tile === 0) {
					return;
				}

				const x = chunk.x + (index % chunk.width) + 0.5;
				const y = chunk.y + Math.floor(index / chunk.width) + 0.5;

				const body = new Box(new THREE.Vector3(x, 0.5, y), new THREE.Vector3(1, 1, 1));
				bodies.push(body);
				this.game.scene.add(body.createHelper());
			})
		});

		return bodies;
	}
}