import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.add.image(config.width / 2 - 35, 100, 'logo');
  }

  create() {
    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'button1', 'button2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'button1', 'button2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'button1', 'button2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
