import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';

import Game from './src/Game';
import Debug from './src/Debug';

window.THREE = THREE;
window.game = new Game();

ReactDOM.render(<Debug />, document.getElementById('debug'));
