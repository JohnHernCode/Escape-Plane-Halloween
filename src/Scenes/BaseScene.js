import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
    this.fontSize = 50;
    this.lineHeight = 60;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fill: '#000' };
    this.gameName = 'escape-plane-1';
    this.endpoint = 'https://us-central1-js-capstone-'
      + 'backend.cloudfunctions.net/api/games/XW18hZOJbSUNsh4C3F3k/scores/';
    this.scoreOptions = {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0);
    if (this.config.canGoBack) {
      const backButton = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
        .setOrigin(1)
        .setScale(2)
        .setInteractive();

      backButton.on('pointerup', () => {
        this.scene.start('Options');
      });
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach((menuItem) => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
      menuItem.textGO = this.add.text(...menuPosition,
        menuItem.text, this.fontOptions).setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    });
  }
}

export default BaseScene;
