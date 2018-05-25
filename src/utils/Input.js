import * as THREE from 'three';
import { KEY_SHIFT } from 'keycode-js';

export default class Input {
	constructor(game) {
		this.game = game;
		this.keys = {};
		this.mouse = new THREE.Vector2();
		this.raycaster = new THREE.Raycaster();

		document.addEventListener('keydown', this.onKeyDown, false);
		document.addEventListener('keyup', this.onKeyUp, false);
		game.renderer.domElement.addEventListener('mousemove', this.onMouseMove, false);
		game.renderer.domElement.addEventListener('mousedown', this.onMouseDown, false);
	}

	dispose() {
		document.removeEventListener('keydown', this.onKeyDown);
		document.removeEventListener('keyup', this.onKeyUp);
		game.renderer.domElement.removeEventListener('mousemove', this.onMouseMove);
		game.renderer.domElement.removeEventListener('mousedown', this.onMouseDown);
	}

	onKeyDown = (e) => {
		this.keys[e.keyCode] = true;
	}

	onKeyUp = (e) => {
		this.keys[e.keyCode] = false;
	}

	onMouseMove = (e) => {
		this.mouse.x = (e.offsetX / game.width) * 2 - 1;
		this.mouse.y = -(e.offsetY / game.height) * 2 + 1;
	}

	onMouseDown = (e) => {
		if (this.isPressed(KEY_SHIFT)) {

			this.game.camera.updateMatrixWorld();
			this.raycaster.setFromCamera(this.mouse, this.game.camera);
			const intersects = this.raycaster.intersectObjects(game.currentLevel.children[0].entities.children, true);

			if (intersects.length > 0) {
				console.log(intersects[0].object.parent);
				this.game.inspector.inspect(intersects[0].object.parent);
			}
		}
	}

	isPressed(keyCode) {
		return !!this.keys[keyCode];
	}
}
