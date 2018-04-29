// import * as THREE from 'three';

// import { AABB, Point } from '../intersect';

// export default class Player extends THREE.Group {
// 	constructor(game) {
// 		super();

// 		this.game = game;


// 		this.delta = new Point();
// 		this.velocity = new Point(.1, .1);
// 		this.body = new AABB(
// 			new Point(0, 0),
// 			new Point(0.2, 0.2)
// 		);

// 		this.mesh = new THREE.Mesh(
// 			new THREE.CylinderGeometry(0.2, 0.2, 1, 8),
// 			new THREE.MeshNormalMaterial()
// 		);

// 		this.add(this.mesh);
// 		this.game.scene.add(this.body.getHelper());
// 	}

// 	update(delta, elapsed) {
// 		this.position.x = Math.sin(elapsed / 2) * 10;
// 		this.position.z = Math.sin(elapsed / -3) * 8;

// 		this.body.pos.x = this.position.x;
// 		this.body.pos.y = this.position.z;
// 		this.body.update();

// 		const sweep = this.body.sweepInto(this.game.map.bodies, )
// 	}
// }