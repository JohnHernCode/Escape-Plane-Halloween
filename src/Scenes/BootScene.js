import Phaser from 'phaser';
import myLogo from '../assets/logo.png';

// eslint-disable-next-line no-undef
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', myLogo);
  }

  create() {
    this.scene.start('Preloader');
  }
}
