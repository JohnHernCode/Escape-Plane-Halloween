import BaseScene from './BaseScene';

export default class OptionsScene extends BaseScene {
  constructor(config) {
    super('Options', config);
    this.menu = [
      { scene: 'PlayScene', text: 'Play' },
      { scene: 'ScoreScene', text: 'Score' },
      { scene: null, text: 'Exit' },
    ];
  }

  create() {
    super.create();
    this.createMenu(this.menu);
  }
}
