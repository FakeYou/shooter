import * as THREE from 'three';

import Entity from './Entity';
import Animation from '../Animation';

export default class Pillar extends Entity {
	static config = {
		animations: {
			flame: new Animation([513, 514, 515, 516, 517, 518, 519, 520], true),
		},
	}

	constructor(game, map, definition) {
		super(game, map, definition, Pillar.config);

		this.animation = this.config.animations.flame;
		this.animation.start();
	}
}