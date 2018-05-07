import * as THREE from 'three';

import Game from './src/Game';

window.THREE = THREE;
window.game = new Game(document.querySelector('.container'));
