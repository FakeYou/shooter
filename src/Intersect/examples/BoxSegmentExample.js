import * as THREE from 'three';

import Segment from '../Segment';
import Box from '../Box';

export default class BoxPointExample extends THREE.Group {
	constructor(game) {
		super();

		this.game = game;

		this.angle = 0;
		this.segment = new Segment();
		this.box = new Box(new THREE.Vector3(), new THREE.Vector3(1, 0.001, 1));

		this.segment.createHelper();
		this.box.createHelper();

		this.add(this.segment.helper);
		this.add(this.box.helper);
	}

	update(delta, elapsed) {
		if (this.hit) {
			this.remove(this.hit.helper);
			this.hit = null;
		}

		this.angle += 0.25 * Math.PI * delta;

		const pos1 = new THREE.Vector3(Math.cos(this.angle * 0.6) * 4, 0, Math.sin(this.angle) * 4);
		const pos2 = new THREE.Vector3(Math.sin(this.angle) * 2, 0, Math.cos(this.angle) * 2);
		const diff = pos2.clone().sub(pos1);
		this.segment.position.copy(pos1);
		this.segment.delta.copy(diff);
		this.segment.updateHelper();

		this.hit = this.box.intersectSegment(this.segment);

		if (this.hit) {
			this.add(this.hit.createHelper());
		}
	}
}
