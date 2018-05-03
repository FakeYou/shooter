import * as THREE from 'three';

export default class Billboards extends THREE.Group {
	constructor(game, map, definition) {
		super();

		this.game = game;
		this.map = map;
		this.definition = definition;

		const tilewidth = this.map.definition.tilewidth;
		const tileheight = this.map.definition.tileheight;

		definition.objects.forEach(object => {
			const tile = this.map.tileset.createTile(object.gid);
			const x = object.x / tilewidth + 0.5;
			const y = object.y / tileheight - 0.5;

			const color = this.map.lights.getColor(Math.floor(x), Math.floor(y));
			
			tile.geometry.faces.forEach(face => face.color = color);
			tile.scale.set(object.width / tilewidth, object.height / tileheight, 1);
			tile.position.set(x, object.height / tileheight / 2, y);
			tile.definition = object;

			this.add(tile);
		});
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