import Phaser from 'phaser';
import background from '../assets/Background/Background.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('back', background);
  }

  create() {
    this.add.image(0, 0, 'back').setOrigin(0);
  }
}
