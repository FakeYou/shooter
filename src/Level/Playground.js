import * as THREE from 'three';

import Map from '../Map';

export default class Playground extends THREE.Group {
	constructor(game) {
		super();

		this.game = game;

		this.map = new Map(game, game.loader.assets['map-playground']);
		this.add(this.map);
	}

	update(delta, elapsed) {
		this.map.update(delta, elapsed);
	}
}