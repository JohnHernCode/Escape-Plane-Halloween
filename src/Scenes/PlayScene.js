/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import BG from '../assets/BG.png';
import planeGuy from '../assets/Plane/FlyScaled.png';
import walls from '../assets/Tiles/walls.png';

const WALLS_TO_RENDER = 4;

export default class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');
    this.config = config;

    this.plane = null;
    this.allWalls = null;

    this.VELOCITY = 200;

    this.upVelocity = 250;

    this.wallHorizontalDist = 0;
    this.wallVertDistRange = [150, 250];
    this.wallHorizontalDistRange = [500, 600];
  }

  preload() {
    this.load.image('bg', BG);
    this.load.image('plane', planeGuy);
    this.load.image('wall', walls);
  }

  create() {
    this.createBG();
    this.createPlane();
    this.createWalls();
    this.handleInputs();
  }

  update() {
    this.checkGameStatus();
    this.recycleWalls();
  }

  createBG() {
    this.add.image(this.config.width / 2, this.config.height / 2, 'bg');
  }

  createPlane() {
    this.plane = this.physics.add.sprite(
      this.config.startPosition.x, this.config.startPosition.y, 'plane',
    ).setOrigin(0);
    this.plane.body.gravity.y = 400;
  }

  createWalls() {
    this.allWalls = this.physics.add.group();

    for (let i = 0; i < WALLS_TO_RENDER; i += 1) {
      const upperWall = this.allWalls.create(0, 0, 'wall').setOrigin(0, 1);
      const lowerWall = this.allWalls.create(0, 0, 'wall').setOrigin(0, 0);

      this.placeWalls(upperWall, lowerWall);
    }

    this.allWalls.setVelocityX(-200);
  }

  handleInputs() {
    this.input.on('pointerdown', this.up, this);
    const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    spaceBar.on('down', this.up, this);
  }

  checkGameStatus() {
    if (this.plane.y > this.config.height || this.plane.y < -this.plane.height) {
      this.restartPosition();
    }
  }

  placeWalls(uWall, lWall) {
    const rightMostX = this.getRightMostWall();
    const wallVertDist = Phaser.Math.Between(...this.wallVertDistRange);
    const wallVertPos = Phaser.Math.Between(0 + 20, this.config.height - 20 - wallVertDist);
    const wallHorizontalDist = Phaser.Math.Between(...this.wallHorizontalDistRange);

    uWall.x = rightMostX + wallHorizontalDist;
    uWall.y = wallVertPos;

    lWall.x = uWall.x;
    lWall.y = uWall.y + wallVertDist;
  }

  recycleWalls() {
    const tempWalls = [];
    this.allWalls.getChildren().forEach((wall) => {
      if (wall.getBounds().right <= 0) {
        tempWalls.push(wall);
        if (tempWalls.length === 2) {
          this.placeWalls(...tempWalls);
        }
      }
    });
  }

  getRightMostWall() {
    let rightMostX = 0;

    this.allWalls.getChildren().forEach((wall) => {
      rightMostX = Math.max(wall.x, rightMostX);
    });

    return rightMostX;
  }

  restartPosition() {
    this.plane.x = this.config.startPosition.x;
    this.plane.y = this.config.startPosition.y;
    this.plane.body.velocity.y = 0;
  }

  up() {
    this.plane.body.velocity.y = -this.upVelocity;
  }
}
