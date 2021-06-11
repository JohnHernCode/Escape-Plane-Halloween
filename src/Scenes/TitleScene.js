import Phaser from 'phaser';
import config from '../Config/config';
import btnRed from '../assets/Btn.png';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
  }

  create() {
    // Game
    this.gameButton = this.add.sprite(100, 200, 'button1')
      .setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Play', {
      fontSize: '32px',
      fill: '#fff',
    });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', (pointer) => {
      this.scene.start('Game');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('button1');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('button2');
    });
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2
        - offset * 100, config.width, config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    // eslint-disable-next-line no-undef
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}
