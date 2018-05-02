import React from 'react';
import ReactDOM from 'react-dom';
import { observable, reaction } from 'mobx';
import * as THREE from 'three';
import Stats from 'stats-js';
import OrbitControls from 'orbit-controls-es6';

import './assets/scss/main.scss';

import state from './State';
import Debug from './Debug';
import Loader from './Loader';
import Map from './Map';
import Player from './entities/Player';

import PlaygroundLevel from './Level/Playground';
import BoxBoxLevel from './Level/debug/BoxBox';
import BoxPointLevel from './Level/debug/BoxPoint';
import BoxSegmentLevel from './Level/debug/BoxSegment';
import SweptBoxLevel from './Level/debug/SweptBox';

import devTileset from './assets/images/dev.png';
import collisionTileset from './assets/images/collision.png';
import lightsTileset from './assets/images/lights.png';

export default class Game {

	static Levels = {
		Playground: PlaygroundLevel,
		BoxBox: BoxBoxLevel,
		BoxPoint: BoxPointLevel,
		BoxSegment: BoxSegmentLevel,
		SweptBox: SweptBoxLevel,
	};

	@observable pixelScale = 2;
	@observable isPlaying = true;
	@observable level = 'Playground';

	constructor() {
		this.width = 960;
		this.height = 720;

		reaction(() => this.pixelScale, this.onPixelScaleChange);
		reaction(() => this.level, this.onLevelChange);

		this.scene = new THREE.Scene();

		this.state = state;
		this.state.setGame(this);

		const aspect = this.width / this.height;
		this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
		this.camera.position.set(4, 4, 4);
		this.camera.lookAt(new THREE.Vector3());

		this.clock = new THREE.Clock(true);
		this.stats = new Stats();

		this.loader = new Loader(this, this.init);
		this.loader.loadTexture('tileset-dev', devTileset);
		this.loader.loadTexture('tileset-collision', collisionTileset);
		this.loader.loadTexture('tileset-lights', lightsTileset);

		this.renderer = new THREE.WebGLRenderer({ antialias: false });
		this.renderer.setPixelRatio(window.devicePixelRatio / this.pixelScale);
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xEAE0E2);

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);

		this.scene.add(new THREE.AxesHelper(8));

		document.getElementById('game').appendChild(this.renderer.domElement);
		document.body.appendChild(this.stats.domElement);
		ReactDOM.render(<Debug />, document.getElementById('debug'));

		this.update = this.update.bind(this);

		this.update();
	}

	init = () => {
		console.log('init');
		this.state.isPlaying = true;
		this.currentLevel = new Game.Levels[this.level](this);
		this.scene.add(this.currentLevel);
	}

	update() {
		this.stats.begin();

		this.state.frame += 1;
		this.state.delta = this.clock.getDelta();
		this.state.elapsed = this.clock.getElapsedTime();

		if (this.state.isPlaying) {
			this.currentLevel.update(state.delta, state.elapsed);
		}

		this.renderer.render(this.scene, this.camera);

		this.stats.end();
		
		this.animationFrame = requestAnimationFrame(this.update);
	}

	onPixelScaleChange = (pixelScale) => {
		this.renderer.setPixelRatio(window.devicePixelRatio / pixelScale);
	}

	onLevelChange = (level) => {
		this.scene.remove(this.currentLevel);

		this.currentLevel = new Game.Levels[level](this);
		this.scene.add(this.currentLevel);
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
			cancelAnimationFrame(window.game.animationFrame);
			window.game.renderer.forceContextLoss();
			window.game.renderer.context = null;
			window.game.renderer.domElement = null;
			window.game.renderer = null;

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
