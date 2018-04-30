import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';

import Game from './src/Game';
import Debug from './src/Debug';

window.THREE = THREE;
window.game = new Game();

ReactDOM.render(<Debug game={window.game} />, document.getElementById('debug'));

if (module.hot) {
	module.hot.accept('./src/Game', () => {
		const Game = require('./src/Game').default;
		window.game = new Game();

		ReactDOM.render(<Debug game={window.game} />, document.getElementById('debug'));
	});
}
