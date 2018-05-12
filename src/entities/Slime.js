import * as THREE from 'three';

import Entity from './Entity';
import Animation from '../Animation';

export default class Slime extends Entity {
	static config = {
		animations: {
			idle: new Animation([558, 558, 558, 558, 558, 558, 542, 542], true),
		},
	}

	constructor(game, map, definition) {
		super(game, map, definition, Slime.config);

		this.animation = this.config.animations.idle.clone();
		this.animation.start();
		this.animation.time += Math.random() * 10000;
	}

	update(delta, elapsed) {
		super.update(delta, elapsed);

		const x = this.definition.x / this.tilewidth + 0.5;
		const y = this.definition.y / this.tileheight - 0.5;

		this.position.x = x + Math.sin(this.animation.time / 1000) * 0.3;
		this.position.z = y + Math.sin(-this.animation.time / 2000) * 0.3;
	}
}