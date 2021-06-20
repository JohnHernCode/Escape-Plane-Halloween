import Phaser from 'phaser';

import PlayScene from './Scenes/PlayScene';
import PreloaderScene from './Scenes/PreloaderScene';
import BootScene from './Scenes/BootScene';
import CreditsScene from './Scenes/CreditsScene';
import OptionsScene from './Scenes/OptionsScene';
import TitleScene from './Scenes/TitleScene';
import ScoreScene from './Scenes/ScoreScene';
import PauseScene from './Scenes/PauseScene';

const WIDTH = 1200;
const HEIGHT = 600;
const PLANE_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: PLANE_POSITION,
};

const Scenes = [BootScene, PreloaderScene, TitleScene, OptionsScene,
  CreditsScene, ScoreScene, PlayScene, PauseScene];
const createScene = (Scene) => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: initScenes(),
};

new Phaser.Game(config);
