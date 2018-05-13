import React, { Fragment } from 'react';
import { observable, reaction } from 'mobx';
import * as THREE from 'three';
import Stats from 'stats-js';
import OrbitControls from 'orbit-controls-es6';

import './assets/scss/main.scss';

import state from './State';
import Debug from './Debug';
import Loader from './Loader';
import Map from './Map';
import Keyboard from './utils/Keyboard';
import Playground from './Level/Playground';

export default class Game {
	constructor(domElement) {
		this.width = 960;
		this.height = 720;

		this.scene = new THREE.Scene();

		const aspect = this.width / this.height;
		this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
		this.camera.position.set(4, 4, 4);
		this.camera.lookAt(new THREE.Vector3());

		this.clock = new THREE.Clock(true);
		this.stats = new Stats();

		this.loader = new Loader(this, this.init);
		this.keyboard = new Keyboard(this);

		this.renderer = new THREE.WebGLRenderer({ antialias: false });
		this.renderer.setPixelRatio(0.5);
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xEAE0E2);
		domElement.appendChild(this.renderer.domElement);

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enableKeys = false;
		// this.controls.enabled = false;

		this.scene.add(new THREE.AxesHelper(8));

		this.update();
	}

	init = () => {
		this.scene.children.forEach(child => this.scene.remove(child));

		this.currentLevel = new Playground(this);
		this.scene.add(this.currentLevel);
	}

	update = () => {
		this.stats.begin();
		const delta = this.clock.getDelta()
		const elapsed = this.clock.getElapsedTime()

		
		if (this.currentLevel) {
			this.currentLevel.update(delta, elapsed);
		}

		this.renderer.render(this.scene, this.camera);
		this.stats.end();
		
		this.animationFrame = requestAnimationFrame(this.update);
	}
}


// if (module.hot) {
// 	const camera = {
// 		position: null,
// 		rotation: null,
// 		target: null,
// 	};

// 	module.hot.dispose(() => {
// 		if (window.game) {
// 			cancelAnimationFrame(window.game.animationFrame);
// 			window.game.renderer.forceContextLoss();
// 			window.game.renderer.context = null;
// 			window.game.renderer.domElement = null;
// 			window.game.renderer = null;

// 			camera.position = game.camera.position;
// 			camera.rotation = game.camera.rotation;
// 			camera.target = game.controls.target;
// 		}

// 		[...document.querySelectorAll('canvas, #stats')].forEach(el => el.remove());

// 		setTimeout(() => {
// 			if (window.game) {
// 				window.game.camera.position.copy(camera.position);
// 				window.game.camera.rotation.copy(camera.rotation);
// 				window.game.controls.target.copy(camera.target);
// 			}
// 		}, 0);
// 	});
// }
