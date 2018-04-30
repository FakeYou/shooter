import * as THREE from 'three';

import Map from '../Map';
import definintion from '../assets/maps/dev';

export default class Playground extends THREE.Group {
	constructor(game) {
		super();

		this.game = game;

		this.map = new Map(game, definintion);
		this.add(this.map);
	}

	update(delta, elapsed) {
		this.map.update(delta, elapsed);
	}
}