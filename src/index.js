import Phaser from 'phaser';

import PlayScene from './Scenes/PlayScene';
import PreloaderScene from './Scenes/PreloaderScene';
import BootScene from './Scenes/BootScene';
import CreditsScene from './Scenes/CreditsScene';
import OptionsScene from './Scenes/OptionsScene';
import TitleScene from './Scenes/TitleScene';

const WIDTH = 1200;
const HEIGHT = 600;
const PLANE_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: PLANE_POSITION,
};

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: [BootScene, PreloaderScene, TitleScene,
    CreditsScene, OptionsScene, new PlayScene(SHARED_CONFIG)],
};

new Phaser.Game(config);
