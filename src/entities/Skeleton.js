import React from 'react';
import * as THREE from 'three';

import Entity from './Entity';
import Animation from '../utils/Animation';
import Box from '../Intersect/Box';

import Vector3 from '../Inspector/Vector3';

export default class Skeleton extends Entity {
	static config = {
		animations: {
			idle: new Animation([601, 602, 603, 604, 605, 606, 607, 608, 608, 609, 610, 611], true),
			walk: new Animation([617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629], true),
		},
	}

	constructor(game, map, definition) {
		super(game, map, definition, Skeleton.config);

		this.name = 'Skeleton';
		this.body = new Box(this.position, new THREE.Vector3(0.8, 1, 0.8));
		this.game.scene.add(this.body.createHelper());

		this.velocity = new THREE.Vector3();

		this.animation = this.config.animations.idle.clone();
		this.animation.start();
		
		this.state = 'idle';
		this.countdown = Math.random() * 8;
	}

	update(delta, elapsed) {
		super.update(delta, elapsed);
		this.body.updateHelper();
		this.countdown -= delta;

		if (this.countdown < 0) {
			this.countdown = Math.random() * 10;

			if (this.state === 'idle') {
				this.state = 'walk';
				this.animation = this.config.animations.walk.clone();
				this.animation.start();

				this.velocity.set(0.0008, 0, 0);
				this.velocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.random() * Math.PI * 2);
			}
			else {
				this.state = 'idle';
				this.animation = this.config.animations.idle.clone();
				this.animation.start();

				this.velocity.x = 0;
				this.velocity.z = 0;
			}
		}
	}

	inspect = () => {
		return (
			<div>
				<Vector3 label="Rotation" type="rotation" vector3={this.rotation} />
			</div>
		);
	}
}