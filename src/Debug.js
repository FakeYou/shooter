import * as dat from 'dat.gui';

export default class Debug {

	static gui;

	constructor(game) {
		this.game = game;

		this.showHitbox = false;
		this.enableFreeCam = false;
	}

	handleShowHitbox = (showHitbox) => {
		this.game.scene.traverse(child => {
			if (child.type === 'hitbox') {
				child.visible = showHitbox;
			}
		});

		this.showHitbox = showHitbox;
	}

	handleEnableFreeCam = (enableFreeCam) => {
		this.game.controls.enabled = enableFreeCam;

		if (enableFreeCam) {
			this.game.controls.target.copy(this.game.camera.position);
			this.game.camera.position.y += 3;
			this.game.camera.translateZ(3);
			this.game.controls.update();
		}

		this.enableFreeCam = enableFreeCam;
	}

	export = () => {
		
	}

	static init(game) {
		const debug = new Debug(game);
		Debug.gui = new dat.GUI();

		Debug.gui.add(debug, 'showHitbox').onChange(debug.handleShowHitbox);
		Debug.gui.add(debug, 'enableFreeCam').onChange(debug.handleEnableFreeCam);
		Debug.gui.add(debug, 'export');

		debug.handleShowHitbox(this.showHitbox);
		debug.handleEnableFreeCam(this.enableFreeCam);

		Debug.gui.close();
	}

	static add(...args) {
		return Debug.gui.add(...args);
	}

	static addFolder(...args) {
		return Debug.gui.addFolder(...args);
	}

	static addColor(...args) {
		return Debug.gui.addColor(...args);
	}
}
