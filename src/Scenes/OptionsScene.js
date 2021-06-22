/* eslint-disable no-unused-expressions */
import BaseScene from './BaseScene';

export default class OptionsScene extends BaseScene {
  constructor(config) {
    super('Options', config);
  }

  create() {
    super.create();
    this.scoreButton = this.add.sprite(this.config.width / 2,
      this.config.height / 2 - 100, 'leader').setInteractive();

    this.scoreButton.on('pointerup', () => {
      this.scene.start('ScoreScene');
    });

    this.backButton = this.add.sprite(this.config.width / 2,
      this.config.height / 2 + 100, 'bkBtn').setInteractive();

    this.backButton.on('pointerup', () => {
      this.scene.start('Title');
    });
  }
}
