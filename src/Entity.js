import * as THREE from 'three';

export const BODY_TYPES = {
	POINT: 'point',
	SEGMENT: 'segment',
	AABB: 'aabb',
};

export default class Entity extends THREE.Group {
	constructor(game, bodyType) {
		super();

		this.game = game;
		this.bodyType = bodyType;
	}
}