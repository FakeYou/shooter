import * as THREE from 'three';

export default class Tileset {
	static PADDING = 0.001;

	static FLAG_FLIPPED_HORIZONTAL = 0x80000000;
	static FLAG_FLIPPED_VERTICAL   = 0x40000000;
	static FLAG_FLIPPED_DIAGONAL   = 0x20000000;

	constructor(game, tilesets) {
		this.game = game;
		this.tilesets = tilesets;

		this.tiles = [];

		tilesets.forEach(tileset => {
			const texture = game.loader.assets[`tileset-${tileset.name}`];
			
			const columns = tileset.columns;
			const rows = tileset.tilecount / tileset.columns;

			const size = new THREE.Vector2(
				(1 / columns) - (Tileset.PADDING * 2),
				(-1 / rows) + (Tileset.PADDING * 2)
			);

			const material = new THREE.MeshBasicMaterial({
				map: texture,
				vertexColors: THREE.FaceColors,
				alphaTest: 0.5,
			});

			for (let i = 0; i < tileset.tilecount; i++) {
				const x = i % columns;
				const y = Math.floor(i / columns);
	
				const uv = new THREE.Vector2(
					((x % columns) / columns) + Tileset.PADDING,
					(1 - ((y + 1) / rows)) + Tileset.PADDING
				);
	
				this.tiles[tileset.firstgid + i] = { material, uv, size };
			}
		});
	}

	getTile(index) {
		const gid = index & ~(Tileset.FLAG_FLIPPED_HORIZONTAL | Tileset.FLAG_FLIPPED_VERTICAL | Tileset.FLAG_FLIPPED_DIAGONAL);
		
		return this.tiles[gid];
	}
	
	createTile(index) {
		const isFlippedHorizontal = !!(index & Tileset.FLAG_FLIPPED_HORIZONTAL);
		const isFlippedVertical = !!(index & Tileset.FLAG_FLIPPED_VERTICAL);
		const isFlippedDiagonal = !!(index & Tileset.FLAG_FLIPPED_DIAGONAL);

		const gid = index & ~(Tileset.FLAG_FLIPPED_HORIZONTAL | Tileset.FLAG_FLIPPED_VERTICAL | Tileset.FLAG_FLIPPED_DIAGONAL);

		const tile = this.getTile(gid);

		if (gid !== index) {
			console.log({ index, isFlippedDiagonal, isFlippedHorizontal, isFlippedVertical });
		}

		const geometry = new THREE.PlaneGeometry(1, 1);
		geometry.faceVertexUvs[0].forEach(face => {
			face.forEach(corner => {
				let signX;
				let signY;

				if (isFlippedDiagonal) {
					if (isFlippedHorizontal === isFlippedVertical) {
						signX = isFlippedHorizontal ? corner.y : (1 - corner.y);
						signY = isFlippedVertical ? corner.x : (1 - corner.x);
					}
					else {
						signX = isFlippedHorizontal ? (1 - corner.y) : corner.y;
						signY = isFlippedVertical ? (1 - corner.x) : corner.x;
					}
				}
				else {
					signX = isFlippedHorizontal ? (1 - corner.x) : corner.x;
					signY = isFlippedVertical ? (1 - corner.y) : corner.y;
				}

				corner.x = tile.uv.x + tile.size.x * signX;
				corner.y = tile.uv.y - tile.size.y * signY;
			});
		});

		return new THREE.Mesh(geometry, tile.material);
	}
}