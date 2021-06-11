import Phaser, { Game } from 'phaser';
import './style.css';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
// import config from './Config/config';

// class Game extends Phaser.Game {
//   constructor() {
//     super(config);
//     this.scene.add('Boot', BootScene);
//     this.scene.add('Preloader', PreloaderScene);
//     this.scene.add('Title', TitleScene);
//     this.scene.add('Options', OptionsScene);
//     this.scene.add('Credits', CreditsScene);
//     this.scene.add('Game', GameScene);
//     this.scene.start('Game');
//   }
// }
//
// window.game = new Game();
const canvas = document.getElementById('game-canvas');
const config = {
  type: Phaser.WEBGL,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  canvas,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: true,
    },
  },
  scene: [
    BootScene,
    GameScene,
    PreloaderScene,
    TitleScene,
    OptionsScene,
    CreditsScene,
  ],
};

const game = new Game(config);
