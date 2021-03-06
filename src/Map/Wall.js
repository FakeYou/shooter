import * as THREE from 'three';

import { randomColor } from '../helpers';

export default class Wall extends THREE.Group {
	constructor(game, map, definition) {
		super();

		this.game = game;
		this.map = map;
		this.definition = definition;
		this.size = definition.width;

		// const grid = new THREE.GridHelper(this.size, 1, 0x0, randomColor());
		// grid.position.y = 0.5;
		// this.add(grid);
		
		this.position.set(definition.x + this.size / 2, 0, definition.y + this.size / 2);
		const data = definition.data;
		const tileset = this.map.tileset;
		const lights = this.map.lights;

		const size = this.size;
		const total = size * size;

		data.forEach((gid, i) => {
			if (gid === 0) {
				return;
			}

			const geometry = new THREE.Geometry();
			const x = definition.x + i % this.size;
			const y = definition.y + Math.floor(i / this.size);

			// Add walls for each direction. First we check if the neighbouring tile in a direction is
			// solid or not. If it is not solid then we need to place a woll here. Because each chunk
			// is indendent we cannot be sure what is on the otherside of edge of the current chunk. To be
			// safe we always render the outer wall of a chunk.
			if (i <= (size - 1) || (i - size >= 0 && data[i - size] === 0)) {
				const north = tileset.createTile(gid);
				const color = lights.getColor(x, y - 1);
				north.geometry.faces.forEach(face => face.color = color);
				north.geometry.rotateY(Math.PI);
				north.geometry.translate(0, 0, -0.5);
				geometry.merge(north.geometry);
			}

			if (i % size === 0 || (i - 1 >= 0 && data[i - 1] === 0)) {
				const west = tileset.createTile(gid);
				const color = lights.getColor(x - 1, y);
				west.geometry.faces.forEach(face => face.color = color);
				west.geometry.rotateY(Math.PI / -2);
				west.geometry.translate(-0.5, 0, 0);
				geometry.merge(west.geometry);
			}

			if (i >= (total - size) || (i + size <= (total - 1) && data[i + size] === 0)) {
				const south = tileset.createTile(gid);
				const color = lights.getColor(x, y + 1);
				south.geometry.faces.forEach(face => face.color = color);
				south.geometry.translate(0, 0, 0.5);
				geometry.merge(south.geometry);
			}

			if (i % size === (size - 1) || (i + 1 <= (total - 1) && data[i + 1] === 0)) {
				const east = tileset.createTile(gid);
				const color = lights.getColor(x + 1, y);
				east.geometry.faces.forEach(face => face.color = color);
				east.geometry.rotateY(Math.PI / 2);
				east.geometry.translate(0.5, 0, 0);
				geometry.merge(east.geometry);
			}

			const offset = size / 2 - 0.5;
			const mesh = new THREE.Mesh(geometry, tileset.getTile(gid).material);
			mesh.position.set(i % size - offset, 0.5, Math.floor(i / size) - offset);

			this.add(mesh);
		});
	}
}