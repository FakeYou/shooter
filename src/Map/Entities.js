import * as THREE from 'three';

import Entity from '../entities/Entity';
import Door from '../entities/Door';
import Pillar from '../entities/Pillar';

export default class Entities extends THREE.Group {
	constructor(game, map, definition) {
		super();

		this.game = game;
		this.map = map;
		this.definition = definition;

		definition.objects.forEach(object => {
			switch (object.type) {
				case 'door':
					this.add(new Door(game, map, object));
					break;
				
				case 'pillar':
					this.add(new Pillar(game, map, object));
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
	}
}