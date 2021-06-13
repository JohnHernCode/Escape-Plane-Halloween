import Phaser from 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';

export default class PauseScreen extends Phaser.Scene {
  constructor() {
    super('Pause');
  }

  create() {
    // Game
    this.continueButton = new Button(this, config.width / 2, config.height / 2 - 100, 'button1', 'button2', 'Continue', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'button1', 'button2', 'Game Options', 'Options');

    // Credits
    this.exitButton = new Button(this, config.width / 2, config.height / 2 + 100, 'button1', 'button2', 'Exit', 'Title');
  }
}
