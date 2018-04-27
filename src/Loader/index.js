import * as THREE from 'three';
import { URLSearchParams } from 'url';

export default class Loader extends THREE.LoadingManager {
	constructor() {
		super();

		this.textureLoader = new THREE.TextureLoader(this);
		this.assets = {};

		this.cache = true;
	}

	onStart(...args) {
		console.log('start', args);
	}

	onProgress(...args) {
		console.log('progress', args);
	}

	onLoad(...args) {
		console.log('load', args);
	}

	loadTexture(name, url) {
		console.log(`load texture ${name} from ${url}`);

		const n = this.cache || Date.now();

		const texture = this.textureLoader.load(`${url}?n=${n}`);
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.NearestFilter;

		this.assets[name] = texture;
	}
}
