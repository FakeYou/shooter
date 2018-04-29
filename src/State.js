import { observable, action, reaction } from 'mobx';

class State {
	@observable isPlaying = false;
	@observable frame = 0;
	@observable delta = 0;
	@observable elapsed = 0;
	@observable messages = [];

	game = null;

	constructor() {
		reaction(
			() => this.messages.length,
			length => {
				if (length > 10) {
					this.messages.splice(0, 1);
				}
			}
		)
	}

	setGame(game) {
		this.game = game;
	}

	@action
	stop = () => {
		this.isPlaying = false;
	}

	@action
	start = () => {
		this.isPlaying = true;
	}

	@action
	step = () => {
		if (this.game) {
			this.isPlaying = true;
			this.game.update();
			this.isPlaying = false;
		}
	}
}

const state = new State();
export default state;
