import * as THREE from 'three';

import Entity from '../entities/Entity';
import Door from '../entities/Door';
import Orc from '../entities/Orc';
import Pillar from '../entities/Pillar';
import Player from '../entities/Player';
import { Slime, Skeleton } from '../entities';

export default class Entities extends THREE.Group {
	constructor(game, map, definition) {
		super();

		this.game = game;
		this.map = map;
		this.definition = definition;

		this.create();
	}

	create() {
		this.definition.objects.forEach(object => {
			switch (object.type) {
				case 'player':
					this.add(new Player(this.game, this.map, object));
					break;

				case 'door':
					this.add(new Door(this.game, this.map, object));
					break;

				case 'orc':
					this.add(new Orc(this.game, this.map, object));
					break;
				
				case 'pillar':
					this.add(new Pillar(this.game, this.map, object));
					break;

				case 'skeleton':
					this.add(new Skeleton(this.game, this.map, object));
					break;

				case 'slime':
					this.add(new Slime(this.game, this.map, object));
					break;

				default:
					this.add(new Entity(this.game, this.map, object));
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


if (module.hot) {
	module.hot.accept('../entities/', (module) => {
		console.log('Replacing entities', module);

		const Entities = require('../entities');
		const types = Object.keys(Entities);

		const container = window.game.currentLevel.map.entities;
		const deletion = [];
		const addition = [];

		container.children.forEach((child) => {
			if (types.includes(child.constructor.name)) {
				const nextChild = new Entities[child.constructor.name](child.game, child.map, child.definition);
				
				console.log(`Replacing ${child.constructor.name} | ${child.id} => ${nextChild.id}`);

				nextChild.copy(child)
				deletion.push(child);
				addition.push(nextChild);
			}
		});

		deletion.forEach(del => container.remove(del));
		addition.forEach(add => container.add(add));
	});
}