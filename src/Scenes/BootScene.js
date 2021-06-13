import Phaser from 'phaser';
import myLogo from '../assets/logo.png';
import spriteSheet from '../assets/ninjacat.png';

// eslint-disable-next-line no-undef
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', myLogo);
    this.load.spritesheet('cat', spriteSheet, { frameWidth: 256, frameHeight: 222 });
  }

  create() {
    this.scene.start('Preloader');
  }
}
