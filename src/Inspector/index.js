import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader'

import Root from './Root';

export default class Inspector {
	constructor(game, domElement) {
		this.game = game;
		this.domElement = domElement;
		this.root = React.createRef();

		const Container = hot(module)(() => <Root game={this.game} ref={this.root} />);

		ReactDOM.render(<Container />, domElement);
	}

	update(delta, elapsed) {
		this.root.current.update(delta, elapsed);
	}

	inspect(object) {
		this.root.current.inspect(object);
	}
}