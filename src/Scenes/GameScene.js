import 'phaser';
import myLogo from '../assets/logo.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('logo', myLogo);
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}
