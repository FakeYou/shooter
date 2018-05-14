import * as dat from 'dat.gui';

export default class Debug {

	static gui;

	constructor(game) {
		this.game = game;

		this.showHitbox = true;
	}

	handleShowHitbox = (showHitbox) => {
		console.log(showHitbox);

		this.game.scene.traverse(child => {
			if (child.type === 'hitbox') {
				child.visible = showHitbox;
			}
		});

		this.showHitbox = showHitbox;
	}

	static init(game) {
		const debug = new Debug(game);
		Debug.gui = new dat.GUI();

		console.log(debug);

		Debug.gui.add(debug, 'showHitbox').onChange(debug.handleShowHitbox);
	}

	static add(...args) {
		Debug.gui.add(...args);
	}
}
