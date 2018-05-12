import * as THREE from 'three';

import { randomColor } from '../helpers';

export default class Floor extends THREE.Group {
	constructor(game, map, definition) {
		super();

		this.game = game;
		this.map = map;
		this.definition = definition;
		this.size = definition.width;

		this.position.set(definition.x + this.size / 2, 0, definition.y + this.size / 2);
		
		// this.add(new THREE.GridHelper(this.size, 1, 0x0, randomColor()));

		definition.data.forEach((gid, i) => {
			if (gid === 0) {
				return;
			}

			const x = definition.x + i % this.size;
			const y = definition.y + Math.floor(i / this.size);

			const color = this.map.lights.getColor(x, y);
			const tile = this.map.tileset.createTile(gid);
			const offset = (this.size / 2) - 0.5;

			tile.geometry.faces.forEach(face => face.color = color);
			tile.geometry.rotateX(Math.PI / -2);
			tile.position.set(i % this.size - offset, 0, Math.floor(i / this.size) - offset);

			this.add(tile);
		});
	}
}