import { ENGINE_METHOD_DIGESTS } from "constants";

export default class Animation {
	static FRAME_DURATION = 240;

	constructor(frames, repeat) {
		this.frame = frames[0];
		this.frames = frames;
		this.repeat = repeat;

		this.isPlaying = false;
		this.time = 0;
	}

	start() {
		this.isPlaying = true;
		this.time = 0;
	}

	update(delta, elapsed) {
		if (!this.isPlaying) {
			return;
		}

		this.time += delta;

		let index = Math.floor(this.time / Animation.FRAME_DURATION);
		
		if (this.repeat) {
			index = index % this.frames.length;
		}
		else {
			index = Math.max(index, this.frames.length - 1);
		}

		this.frame = this.frames[index];
	}

	clone() {
		return new Animation(this.frames, this.repeat);
	}
}