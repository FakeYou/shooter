import * as THREE from 'three';

const PADDING = 0.001;

export default class Tileset {
	constructor(game, tilesets) {
		this.game = game;
		this.tilesets = tilesets;

		this.tiles = [];

		tilesets.forEach(tileset => {
			console.log(tileset);
			this.texture = game.loader.assets[`tileset-${tileset.name}`];
			
			const columns = tileset.columns;
			const rows = tileset.tilecount / tileset.columns;

			const size = new THREE.Vector2(
				(1 / columns) - (PADDING * 2),
				(-1 / rows) + (PADDING * 2)
			);

			const material = new THREE.MeshBasicMaterial({
				map: this.texture,
				vertexColors: THREE.FaceColors,
				alphaTest: 0.5,
			});

			for (let i = 0; i < tileset.tilecount; i++) {
				const x = i % columns;
				const y = Math.floor(i / columns);
	
				const uv = new THREE.Vector2(
					((x % columns) / columns) + PADDING,
					(1 - ((y + 1) / rows)) + PADDING
				);
	
				this.tiles[tileset.firstgid + i] = { material, uv, size };
			}
		});
	}

	getTile(index) {
		return this.tiles[index];
	}

	createTile(index) {
		const tile = this.tiles[index];

		const geometry = new THREE.PlaneGeometry(1, 1);
		geometry.faceVertexUvs[0].forEach(face => {
			face.forEach(corner => {
				corner.x = tile.uv.x + tile.size.x * corner.x;
				corner.y = tile.uv.y - tile.size.y * corner.y;
			});
		});

		return new THREE.Mesh(geometry, tile.material);
	}
}