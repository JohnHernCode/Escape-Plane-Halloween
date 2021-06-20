/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import BG from '../assets/BG.png';
import planeGuy from '../assets/Plane/FlyScaled.png';
import walls from '../assets/Tiles/walls.png';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
    this.initialPosition = {
      x: 80,
      y: 300,
    };
    this.config = {
      width: 1200,
      height: 600,
    };

    this.plane = null;
  }

  preload() {
    this.load.image('bg', BG);
    this.load.image('plane', planeGuy);
    this.load.image('wall', walls);
  }

  create() {
    this.add.image(this.config.width / 2, this.config.height / 2, 'bg');
    this.plane = this.physics.add.sprite(
      this.initialPosition.x, this.initialPosition.y, 'plane',
    ).setOrigin(0);
    this.plane.body.gravity.y = 400;
  }

  update() {

  }
}
