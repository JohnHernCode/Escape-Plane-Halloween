import Phaser from 'phaser';

import PlayScene from './Scenes/PlayScene';
import PreloaderScene from './Scenes/PreloaderScene';
import BootScene from './Scenes/BootScene';
import CreditsScene from './Scenes/CreditsScene';
import OptionsScene from './Scenes/OptionsScene';
import TitleScene from './Scenes/TitleScene';
import ScoreScene from './Scenes/ScoreScene';
import PauseScene from './Scenes/PauseScene';
import UserScene from './Scenes/UserScene';
import SubmitScene from './Scenes/SubmitScene';

const WIDTH = 800;
const HEIGHT = 600;
const PLANE_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: PLANE_POSITION,
};

const Scenes = [BootScene, PreloaderScene, TitleScene, OptionsScene,
  CreditsScene, ScoreScene, UserScene, PlayScene, PauseScene, SubmitScene];
const createScene = (Scene) => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  parent: 'container',
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
    },
  },
  dom: {
    createContainer: true,
    expandParent: true,
  },
  scene: initScenes(),
};

// eslint-disable-next-line no-new
new Phaser.Game(config);
