import * as THREE from 'three';

import Entity from './Entity';
import Animation from '../utils/Animation';
import Box from '../Intersect/Box';

export default class Orc extends Entity {
	static config = {
		animations: {
			idle: new Animation([633, 633, 633, 634, 635, 635, 635, 634], true),
			walk: new Animation([641, 641, 642, 642, 643, 643, 644, 644], true),
		},
	}

	constructor(game, map, definition) {
		super(game, map, definition, Orc.config);

		this.body = new Box(this.position, new THREE.Vector3(0.8, 1, 0.8));
		this.game.scene.add(this.body.createHelper());

		this.velocity = new THREE.Vector3();

		this.animation = this.config.animations.idle.clone();
		this.animation.start();
		
		this.state = 'idle';
		this.countdown = Math.random() * 8;

		this.position.y -= 0.5;
	}

	update(delta, elapsed) {
		super.update(delta, elapsed);
		this.body.updateHelper();
		this.countdown -= delta;

		if (this.countdown < 0) {
			this.countdown = Math.random() * 10;

			if (this.state === 'idle') {
				this.state = 'walk';
				this.animation = this.config.animations.walk;
				this.animation.start();

				this.velocity.set(0.008, 0, 0);
				this.velocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.random() * Math.PI * 2);
			}
			else {
				this.state = 'idle';
				this.animation = this.config.animations.idle;
				this.animation.start();

				this.velocity.x = 0;
				this.velocity.z = 0;
			}
		}
	}
}