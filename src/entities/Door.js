import * as THREE from 'three';

import Entity from './Entity';
import Animation from '../Animation';

export default class Door extends Entity {
	static config = {
		animations: {
			open: new Animation([353, 354, 355, 356], false),
			close: new Animation([356, 355, 354, 353], false),
			loop: new Animation([353, 354, 355, 356, 356, 355, 354, 353], true),
		},
	}

	constructor(game, map, definition) {
		super(game, map, definition, Door.config);

		this.animation = this.config.animations.loop.clone();
		this.animation.start();
	}

	update(delta, elapsed) {
		super.update(delta, elapsed);
	}
}