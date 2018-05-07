import * as THREE from 'three';
import { noop } from 'lodash';

import assets from '../assets';

export default class Loader extends THREE.LoadingManager {
	constructor(game, onFinish) {
		super();

		this.game = game;
		this.onFinish = onFinish || noop;

		this.textureLoader = new THREE.TextureLoader(this);
		this.imageLoader = new THREE.ImageLoader(this);
		this.fileLoader = new THREE.FileLoader(this);
		this.assets = {};

		this.cache = false;

		this.load(assets);
	}

	load = (assets) => {
		this.loadJson('map-playground', assets.maps.playground);
		this.loadTexture('tileset-dev', assets.images.dev);
		this.loadTexture('tileset-dungeon', assets.images.dungeon);
		this.loadTexture('tileset-collision', assets.images.collision);
		this.loadTexture('tileset-lights', assets.images.lights);
	}

	onStart = (url, loaded, total) => {
		console.log(`Start loading ${total} items`)
	}

	onLoad = () => {
		console.log(`Finished loading!`)

		console.log(this.assets['tileset-dev']);

		this.onFinish();
	}

	loadTexture(name, url) {
		console.log(`load texture ${name} from ${url}`);

		const n = this.cache || Date.now();

		this.textureLoader.load(`${url}?n=${n}`, (texture) => {
			texture.magFilter = THREE.NearestFilter;
			texture.minFilter = THREE.NearestFilter;
	
			this.assets[name] = texture;
		});
	}

	loadImage(name, url) {
		console.log(`load image ${name} from ${url}`);

		const n = this.cache || Date.now();

		this.imageLoader.load(`${url}?n=${n}`, (image) => {
			this.assets[name] = image;
		});

	}

	loadJson(name, url) {
		console.log(`load json ${name} from ${url}`);

		const n = this.cache || Date.now();

		this.fileLoader.load(`${url}?n=${n}`, (json) => {
			this.assets[name] = JSON.parse(json);
		});
	}
}

if (module.hot) {
	module.hot.accept('../assets', () => {
		console.log('reload');
		game.loader.load(require('../assets').default);
	});
}