import * as THREE from 'three';

import Tileset from './Tileset';
import Collision from './Collision';
import Ceiling from './Ceiling';
import Floor from './Floor';
import Wall from './Wall';

export const LEVELS = {
	DEV: require('../assets/maps/dev'),
};

console.log(LEVELS);

export default class Map extends THREE.Group {
	constructor(game, definition = LEVELS.DEV) {
		super();

		this.game = game;
		this.definition = definition;

		this.tileset = new Tileset(game, definition.tilesets[0]);
		this.queue = [];
		this.bodies = [];

		definition.layers.forEach((layer) => {
			if (layer.name === 'collision') {
				layer.chunks.forEach(chunk => {
					this.queue.push(() => this.add(new Collision(game, chunk)));
				});
			}

			if (layer.name === 'ceiling') {
				layer.chunks.forEach(chunk => {
					this.queue.push(() => this.add(new Ceiling(game, chunk)));
				});
			}

			if (layer.name === 'wall') {
				layer.chunks.forEach(chunk => {
					this.queue.push(() => this.add(new Wall(game, chunk)));
				})
			}

			if (layer.name === 'floor') {
				layer.chunks.forEach(chunk => {
					this.queue.push(() => this.add(new Floor(game, chunk)));
				});
			}
		});
	}

	update() {
		if (this.queue.length > 0) {
			const task = this.queue.pop();
			task();
		}
	}
}
