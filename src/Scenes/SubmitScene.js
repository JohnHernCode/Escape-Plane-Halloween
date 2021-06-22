import BaseScene from './BaseScene';
import { setScore } from '../APICall';
import subButton from '../assets/BtnSub.png';

export default class SubmitScene extends BaseScene {
  constructor(config) {
    super('SubmitScene', {
      ...config,
      canGoBack: true,
    });
  }

  preload() {
    this.load.image('sub', subButton);
  }

  create() {
    super.create();
    this.gameButton = this.add.sprite(this.config.width / 2,
      this.config.height / 2 - 100, 'sub').setInteractive();

    this.gameButton.on('pointerup', () => {
      const score = JSON.parse(localStorage.getItem('bestScore'));
      const user = localStorage.getItem('username');
      const userData = {
        user,
        score,
      };
      setScore.bind(this)(this.endpoint, this.scoreOptions, userData, this.checkResolve);
    });
  }
}
