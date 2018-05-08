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

		const tilewidth = this.map.definition.tilewidth;
		const tileheight = this.map.definition.tileheight;
		
		this.children.forEach((child, i) => {
			const look = new THREE.Vector3(0, camera.position.y, 0);
			look.y -= child.position.y;
			look.sub(camera.position).multiplyScalar(-1);
			child.lookAt(look);

			if (child.definition.properties.fixed === 'vertical') {
				child.rotation.y = 0;
			}
			else if (child.definition.properties.fixed === 'horizontal') {
				child.rotation.y = camera.position.x > child.position.x ? Math.PI / 2 : Math.PI / -2;
			}

			if (child.definition.type === 'door') {
				const distance = child.position.clone().distanceTo(camera.position);
				const x = child.definition.x / tilewidth + 0.5;
				const y = child.definition.y / tileheight - 0.5;
				const color = this.map.lights.getColor(Math.floor(x), Math.floor(y));

				if (distance < 2) {
					const replacement = this.map.tileset.createTile(354);
					child.geometry = replacement.geometry;
					child.geometry.faces.forEach(face => face.color = color);
				}
				else {
					const replacement = this.map.tileset.createTile(353);
					child.geometry = replacement.geometry;
					child.geometry.faces.forEach(face => face.color = color);
				}
			}
		});
	}
}