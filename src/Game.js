import * as THREE from 'three';
import Stats from 'stats-js';
import OrbitControls from 'orbit-controls-es6';

import Loader from './Loader';
import Map from './Map';

import devTileset from './assets/images/dev.png';

export default class Game {
	constructor() {
		this.width = 960;
		this.height = 720;
		this.scale = 1;

		this.scene = new THREE.Scene();

		const aspect = this.width / this.height;
		this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
		this.camera.position.set(40, 40, 40);
		this.camera.lookAt(new THREE.Vector3());

		this.clock = new THREE.Clock(true);
		this.stats = new Stats();

		this.loader = new Loader();
		this.loader.loadTexture('tileset-dev', devTileset);

		this.renderer = new THREE.WebGLRenderer({ antialias: false });
		this.renderer.setPixelRatio(window.devicePixelRatio / this.scale);
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xEAE0E2);

		this.scene.add(new THREE.AxesHelper(8));

		this.map = new Map(this);
		this.scene.add(this.map);

		document.body.appendChild(this.renderer.domElement);
		document.body.appendChild(this.stats.domElement);
		
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);

		this.update = this.update.bind(this);

		this.update();
	}

	update() {
		this.stats.begin();

		const delta = this.clock.getDelta();
		const elapsed = this.clock.getElapsedTime();

		this.map.update(delta);
		this.renderer.render(this.scene, this.camera);

		this.stats.end();
		this.animationFrame = requestAnimationFrame(this.update);
	}
}

if (module.hot) {
	const camera = {
		position: null,
		rotation: null,
		target: null,
	};

	module.hot.dispose(() => {
		if (window.game) {
			window.game.renderer.forceContextLoss();
			window.game.renderer.context = null;
			window.game.renderer.domElement = null;
			window.game.renderer = null;
			cancelAnimationFrame(window.game.animationFrame);

			camera.position = game.camera.position;
			camera.rotation = game.camera.rotation;
			camera.target = game.controls.target;
		}

		[...document.querySelectorAll('canvas, #stats')].forEach(el => el.remove());

		setTimeout(() => {
			if (window.game) {
				window.game.camera.position.copy(camera.position);
				window.game.camera.rotation.copy(camera.rotation);
				window.game.controls.target.copy(camera.target);
			}
		}, 0);
	});
}
