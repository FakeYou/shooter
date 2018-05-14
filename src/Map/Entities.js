import * as THREE from 'three';

import Entity from '../entities/Entity';
import Door from '../entities/Door';
import Pillar from '../entities/Pillar';
import Player from '../entities/Player';
import Slime from '../entities/Slime';

export default class Entities extends THREE.Group {
	constructor(game, map, definition) {
		super();

		this.game = game;
		this.map = map;
		this.definition = definition;

		definition.objects.forEach(object => {
			switch (object.type) {
				case 'player':
					this.add(new Player(game, map, object));
					break;

				case 'door':
					this.add(new Door(game, map, object));
					break;
				
				case 'pillar':
					this.add(new Pillar(game, map, object));
					break;

				case 'slime':
					this.add(new Slime(game, map, object));
					break;

				default:
					this.add(new Entity(game, map, object));
					break;
			}
		});
	}

	update(delta, elapsed) {
		this.children.forEach((child) => {
			if (child.update) {
				child.update(delta, elapsed);
			}
		});

		const bodies = this.children
			.filter(child => !!child.body)
			.map(child => child.body);

		bodies.push(...this.map.collision.bodies)

		this.children.forEach(child => {
			if (child.body && child.velocity) {
				let into = bodies.filter(x => x.position.distanceTo(child.position) < 3);
				let iterations = 0;
				let sweep;

				do {
					sweep = child.body.sweepInto(into, child.velocity);
	
					if (sweep.hit) {
						into = into.filter(x => x !== sweep.hit.collider);

						if (sweep.hit.normal.x !== 0) {
							child.velocity.x = 0;
						}
						if (sweep.hit.normal.z !== 0) {
							child.velocity.z = 0;
						}
					}

					iterations += 1;
				} while (iterations < 4 && sweep.hit)
			}
		});

		this.children.forEach((child) => {
			if (child.velocity) {
				child.position.add(child.velocity);
			}
		})
	}
}