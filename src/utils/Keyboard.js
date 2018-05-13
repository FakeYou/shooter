

export default class Keyboard {
	constructor(game) {
		this.game = game;
		this.keys = {};

		document.addEventListener('keydown', this.onKeyDown, false);
		document.addEventListener('keyup', this.onKeyUp, false);
	}

	dispose() {
		document.removeEventListener('keydown', this.onKeyDown);
		document.removeEventListener('keyup', this.onKeyUp);
	}

	onKeyDown = (e) => {
		this.keys[e.keyCode] = true;
	}

	onKeyUp = (e) => {
		this.keys[e.keyCode] = false;
	}

	isPressed(keyCode) {
		return !!this.keys[keyCode];
	}
}
