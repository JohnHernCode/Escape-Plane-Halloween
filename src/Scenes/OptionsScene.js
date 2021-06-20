/* eslint-disable no-unused-expressions */
import BaseScene from './BaseScene';

export default class OptionsScene extends BaseScene {
  constructor(config) {
    super('Options', config);
    this.menu = [
      { scene: 'ScoreScene', text: 'Score' },
      { scene: 'Title', text: 'Title Screen' },
    ];
  }

  create() {
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem) {
    const { textGO } = menuItem;
    textGO.setInteractive();

    textGO.on('pointerover', () => {
      textGO.setStyle({ fill: '#ff0' });
    });

    textGO.on('pointerout', () => {
      textGO.setStyle({ fill: '#000' });
    });

    textGO.on('pointerup', () => {
      menuItem.scene && this.scene.start(menuItem.scene);
    });
  }
}
