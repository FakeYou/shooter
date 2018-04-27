import * as THREE from 'three';

import { randomColor } from '../helpers';

export default class Wall extends THREE.Group {
	constructor(game, definition) {
		super();

		this.game = game;
		this.definition = definition;

		this.add(new THREE.GridHelper(16, 1, 0x0, randomColor()));
		this.position.set(definition.x + 8, 0, definition.y + 8);
		const data = definition.data;
		const tileset = game.map.tileset;

		data.forEach((gid, i) => {
			if (gid === 0) {
				return;
			}

			const geometry = new THREE.Geometry();

			// Add walls for each direction. First we check if the neighbouring tile in a direction is
			// solid or not. If it is not solid then we need to place a woll here. Because each chunk
			// is indendent we cannot be sure what is on the otherside of edge of the current chunk. To be
			// safe we always render the outer wall of a chunk.
			if (i <= 15 || (i - 16 >= 0 && data[i - 16] === 0)) {
				const north = tileset.createTile(gid);
				north.geometry.rotateY(Math.PI);
				north.geometry.translate(0, 0, -0.5);
				geometry.merge(north.geometry);
			}

			if (i % 16 === 0 || (i - 1 >= 0 && data[i - 1] === 0)) {
				const west = tileset.createTile(gid);
				west.geometry.rotateY(Math.PI / -2);
				west.geometry.translate(-0.5, 0, 0);
				geometry.merge(west.geometry);
			}

			if (i >= 240 || (i + 16 <= 255 && data[i + 16] === 0)) {
				const south = tileset.createTile(gid);
				south.geometry.translate(0, 0, 0.5);
				geometry.merge(south.geometry);
			}

			if (i % 16 === 15 || (i + 1 <= 255 && data[i + 1] === 0)) {
				const east = tileset.createTile(gid);
				east.geometry.rotateY(Math.PI / 2);
				east.geometry.translate(0.5, 0, 0);
				geometry.merge(east.geometry);
			}

			const mesh = new THREE.Mesh(geometry, tileset.getTile(1).material);
			mesh.position.set(i % 16 - 7.5, 0.5, Math.floor(i / 16) - 7.5);

			this.add(mesh);
		});
	}
}