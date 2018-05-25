import * as THREE from 'three';
import { KEY_W, KEY_S, KEY_D, KEY_A, KEY_RIGHT, KEY_LEFT } from 'keycode-js';

import Entity from './Entity';
import Box from '../Intersect/Box';

export default class Player extends Entity {
	static SPEED = 3;
	static TURN = 3;

	static config = {}

	constructor(game, map, definition) {
		super(game, map, definition, Player.config);

		this.body = new Box(this.position, new THREE.Vector3(0.5, 1, 0.5));
		this.game.scene.add(this.body.createHelper());

		this.tile.rotation.y += Math.PI;
		this.velocity = new THREE.Vector3();
		game.player = this;
	}

	update(delta, elapsed) {
		const force = new THREE.Vector3();
		this.velocity.set(0, 0, 0);

		force.z = Number(this.game.input.isPressed(KEY_S)) - Number(this.game.input.isPressed(KEY_W));
		force.x = Number(this.game.input.isPressed(KEY_D)) - Number(this.game.input.isPressed(KEY_A));

		this.rotation.y -= (Number(this.game.input.isPressed(KEY_RIGHT)) - Number(this.game.input.isPressed(KEY_LEFT))) * delta * Player.TURN;

		if (force.length() > 0) {
			force.normalize()
				.multiplyScalar(Player.SPEED)
				.multiplyScalar(delta)
				.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotation.y);

			this.velocity.add(force);
		}

		this.body.updateHelper();

		if (!this.game.controls.enabled) {
			this.game.camera.position.copy(this.position);
			this.game.camera.rotation.copy(this.rotation);
		}
	}
}
