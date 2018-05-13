import * as THREE from 'three';

import Entity from './Entity';
import Animation from '../utils/Animation';
import Box from '../Intersect/Box';

export default class Pillar extends Entity {
	static config = {
		animations: {
			flame: new Animation([513, 514, 515, 516, 517, 518, 519, 520], true),
		},
	}

	constructor(game, map, definition) {
		super(game, map, definition, Pillar.config);

		this.body = new Box(this.position, new THREE.Vector3(0.4, 1, 0.4));
		this.game.scene.add(this.body.createHelper());

		this.animation = this.config.animations.flame.clone();
		this.animation.start();
	}
}