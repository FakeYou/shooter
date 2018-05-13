import * as THREE from 'three';

import Entity from './Entity';
import Animation from '../utils/Animation';
import Box from '../Intersect/Box';

export default class Slime extends Entity {
	static config = {
		animations: {
			purpleIdle: new Animation([558, 558, 558, 558, 558, 558, 542, 542], true),
			blueIdle: new Animation([554, 554, 554, 554, 554, 554, 554, 554, 538, 538], true),
		},
	}

	constructor(game, map, definition) {
		super(game, map, definition, Slime.config);

		this.body = new Box(this.position, new THREE.Vector3(0.5, 1, 0.5));
		this.game.scene.add(this.body.createHelper());

		this.velocity = new THREE.Vector3();
		this.speed = Math.random() / 2;

		if (Math.random() > 0.5) {
			this.animation = this.config.animations.purpleIdle.clone();
		}
		else {
			this.animation = this.config.animations.blueIdle.clone();
		}

		this.animation.start();
		this.animation.time += Math.random() * 10000;
	}

	update(delta, elapsed) {
		super.update(delta, elapsed);

		this.velocity.x = Math.sin(this.animation.time) * this.speed * delta;
		this.velocity.z = Math.sin(-this.animation.time) * this.speed * delta;

		this.body.updateHelper();
	}
}