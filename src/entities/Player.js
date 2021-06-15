import Phaser from 'phaser';
import initAnimations from './playerAnims';
import collidable from '../mixins/collidable';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // Mixins
    Object.assign(this, collidable);
    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 500;
    this.playerSpeed = 200;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.body.setGravityY(this.gravity);
    this.setOrigin(0.5, 1);
    this.setCollideWorldBounds(true);
    initAnimations(this.scene.anims);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    const {
      left,
      right,
      up,
    } = this.cursors;
    const keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    const keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    const keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    const isWJustDown = Phaser.Input.Keyboard.JustDown(keyW);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

    const onFloor = this.body.onFloor();

    if (left.isDown || keyA.isDown) {
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
    } else if (right.isDown || keyD.isDown) {
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if ((isWJustDown || isUpJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
      this.setVelocityY(-this.playerSpeed * 2);
      this.jumpCount += 1;
    }

    if (onFloor) {
      this.jumpCount = 0;
    }

    if (onFloor) {
      if (this.body.velocity.x !== 0) {
        this.play('run', true);
      } else {
        this.play('idle', true);
      }
    } else {
      this.play('jump', true);
    }
  }
}
