import Phaser from 'phaser';
import BaseScene from './BaseScene';

export default class UserScene extends BaseScene {
  constructor(config) {
    super('UserScene', config);
  }

  create() {
    super.create();

    this.nameInput = this.add.dom(this.config.width / 2, 200)
      .createFromHTML('<input type="text" id="name" name="nameField" '
        + 'placeholder="Enter your name" value="" style="font-size: 20px">');

    this.message = this.add.text(this.config.width / 2, 10, 'WHAT IS YOUR NAME?', {
      color: '#fff',
      fontSize: 24,
      fontStyle: 'bold',
    })
      .setOrigin(0.5);

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    // eslint-disable-next-line no-unused-vars
    this.returnKey.on('down', (e) => {
      const name = this.game.domContainer.querySelector('#name');

      if (name.value !== '') {
        this.message.setText(`Hello, ${name.value}`);
        localStorage.setItem('username', name.value);
        name.value = '';
        this.scene.start('PlayScene');
      }
    });
  }
}
