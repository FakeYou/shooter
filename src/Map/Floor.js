import * as THREE from 'three';

import { randomColor } from '../helpers';

export default class Floor extends THREE.Group {
	constructor(game, definition) {
		super();

		this.game = game;
		this.definition = definition;

		this.position.set(definition.x + 8, 0, definition.y + 8);
		
		this.add(new THREE.GridHelper(16, 1, 0x0, randomColor()));
		definition.data.forEach((gid, i) => {
			if (gid === 0) {
				return;
			}

			const tile = game.map.tileset.createTile(gid);
			tile.geometry.rotateX(Math.PI / -2);
			tile.position.set(i % 16 - 7.5, 0, Math.floor(i / 16) - 7.5);

			this.add(tile);
		});
	}
}