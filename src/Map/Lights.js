import * as THREE from 'three';

import lights from '../assets/images/lights.png';

const COLUMNS = 16;
const ROWS = 20;
const SIZE = 16;

export default class Lights {
	constructor(game, map, definition) {
		this.game = game;
		this.map = map;
		this.definition = definition;
		this.tileset = map.definition.tilesets.filter(x => x.name === 'lights')[0];

		this.default = new THREE.Color(0xffffff);

		this.colors = this.calculateColors();
		this.tiles = this.calculateTiles();
	}

	calculateColors() {
		const image = this.game.loader.assets['tileset-lights'].image;

		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		canvas.width = image.width;
		canvas.height = image.height;
		context.drawImage(image, 0, 0);

		const colors = [];

		for (let y = 0; y < ROWS * SIZE; y += SIZE) {
			for (let x = 0; x < COLUMNS * SIZE; x += SIZE) {
				const [red, green, blue] = context.getImageData(x, y, 1, 1).data;

				colors.push(new THREE.Color(red * 65536 + green * 256 + blue));
			}
		}

		return colors;
	}

	calculateTiles() {
		const tiles = {};

		this.definition.chunks.forEach((chunk) => {
			chunk.data.forEach((tile, index) => {
				if (tile === 0) {
					return;
				}

				const x = chunk.x + (index % chunk.width);
				const y = chunk.y + Math.floor(index / chunk.width);
				const color = this.colors[tile - this.tileset.firstgid];

				tiles[`${x}_${y}`] = color;
			})
		});

		return tiles;
	}

	getColor(x, y) {
		return this.tiles[`${x}_${y}`] || this.default;
	}
}