import * as THREE from 'three';

import { randomColor } from '../helpers';

export default class Collision extends THREE.Group {
	constructor(game, definition) {
		super();

		this.game = game;
		this.definition = definition;
		this.size = definition.width;

		this.position.set(definition.x + this.size / 2, 0, definition.y + this.size / 2);
		
		this.add(new THREE.GridHelper(this.size, 1, 0x0, randomColor()));
		definition.data.forEach((gid, i) => {
			if (gid === 0) {
				return;
			}

			const offset = (this.size / 2) - 0.5;
		});
	}
}