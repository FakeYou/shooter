import { observable, action, reaction } from 'mobx';

import BoxBoxLevel from './Level/debug/BoxBox';
import BoxPointLevel from './Level/debug/BoxPoint';
import BoxSegmentLevel from './Level/debug/BoxSegment';
import SweptBoxLevel from './Level/debug/SweptBox';

class State {
	static Levels = {
		BoxBox: BoxBoxLevel,
		BoxPoint: BoxPointLevel,
		BoxSegment: BoxSegmentLevel,
		SweptBox: SweptBoxLevel,
	};

	@observable isPlaying = true;
	@observable frame = 0;
	@observable delta = 0;
	@observable elapsed = 0;
	@observable messages = [];

	@observable Level = State.Levels.BoxBox;

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
