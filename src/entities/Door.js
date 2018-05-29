import React, { Fragment } from 'react';
import * as THREE from 'three';

import Entity from './Entity';
import Animation from '../utils/Animation';

import Select from '../Inspector/input/Select';
import Number from '../Inspector/input/Number';

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

		this.state = 'closed';
		this.distance = Number.MAX_SAFE_INTEGER;

		this.animation = this.config.animations.close;
		this.animation.start();
	}

	update(delta, elapsed) {
		super.update(delta, elapsed);

		this.distance = this.game.player.position.distanceTo(this.position);

		if (this.distance < 2 && this.state === 'closed') {
			this.handleStateChange(null, 'open');
		}
		else if (this.distance > 2 && this.state === 'open') {
			this.handleStateChange(null, 'closed');
		}
	}

	handleStateChange = (e, value) => {
		if (value !== this.state) {
			this.state = value;

			if (this.state === 'closed') {
				this.animation = this.config.animations.close;
			}
			else {
				this.animation = this.config.animations.open;
			}

			this.animation.start();
		}
	}

	inspect = () => {
		return (
			<Fragment>
				<Select name="State" options={['open', 'closed']} value={this.state} onChange={this.handleStateChange} />
				<Number value={this.distance} />
			</Fragment>
		);
	}
}