import * as THREE from 'three';

export default class Billboards extends THREE.Group {
	constructor(game, map, definition) {
		super();

		this.game = game;
		this.map = map;
		this.definition = definition;

		definition.objects.forEach(object => {
			const tile = this.map.tileset.createTile(object.gid);
			tile.position.set(
				object.x / this.map.definition.tilewidth,
				0.5,
				object.y / this.map.definition.tileheight,
			);

			tile.definition = object;

			this.add(tile);
		});


		console.log(this.definition);
	}

	update() {
		const camera = this.game.camera;
		
		this.children.forEach((child, i) => {
			if (child.definition.properties.fixed) {
				child.rotation.y = -child.definition.rotation * (Math.PI / 180);
			}
			else {
				const look = new THREE.Vector3(0, camera.position.y, 0);
				look.y -= child.position.y;
				look.sub(camera.position).multiplyScalar(-1);
				child.lookAt(look);
			}

		});
	}
}