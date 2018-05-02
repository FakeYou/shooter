import * as THREE from 'three';
import { noop } from 'lodash';

export default class Loader extends THREE.LoadingManager {
	constructor(game, onFinish) {
		super();

		this.game = game;
		this.onFinish = onFinish || noop;

		this.textureLoader = new THREE.TextureLoader(this);
		this.imageLoader = new THREE.ImageLoader(this);
		this.assets = {};

		this.cache = true;
	}

	onStart = (url, loaded, total) => {
		console.log(`Start loading ${total} items`)
	}

	onProgress = (...args) => {
		// console.log('progress', args);
	}

	onLoad = () => {
		console.log(`Finished loading!`)
		this.onFinish();
	}

	loadTexture(name, url) {
		console.log(`load texture ${name} from ${url}`);

		const n = this.cache || Date.now();

		const texture = this.textureLoader.load(`${url}?n=${n}`);
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.NearestFilter;

		this.assets[name] = texture;
	}

	loadImage(name, url) {
		console.log(`load image ${name} from ${url}`);

		const n = this.cache || Date.now();
		const image = this.imageLoader.load(`${url}?n=${n}`);

		this.assets[name] = image;
	}
}
