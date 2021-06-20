import Phaser from 'phaser';

import PlayScene from './Scenes/PlayScene';
import PreloaderScene from './Scenes/PreloaderScene';
import BootScene from './Scenes/BootScene';
import CreditsScene from './Scenes/CreditsScene';
import OptionsScene from './Scenes/OptionsScene';
import TitleScene from './Scenes/TitleScene';

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: [BootScene, PreloaderScene, TitleScene, OptionsScene, PlayScene],
};
let plane = null;
let allWalls = null;

const initialPosition = { x: config.width * 0.1, y: config.height / 2 };

const VELOCITY = 200;

const WALLS_TO_RENDER = 4;

const upVelocity = 250;

const wallHorizontalDist = 0;
const wallVertDistRange = [150, 250];
const wallHorizontalDistRange = [500, 600];

function preload() {
  this.load.image('bg', BG);
  this.load.image('plane', planeGuy);
  this.load.image('wall', walls);
}

function restartPosition() {
  plane.x = initialPosition.x;
  plane.y = initialPosition.y;
  plane.body.velocity.y = 0;
}

function up() {
  plane.body.velocity.y = -upVelocity;
}

function create() {
  const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  this.add.image(config.width / 2, config.height / 2, 'bg');
  plane = this.physics.add.sprite(
    initialPosition.x, initialPosition.y, 'plane',
  ).setOrigin(0);
  plane.body.gravity.y = 400;

  allWalls = this.physics.add.group();

  for (let i = 0; i < WALLS_TO_RENDER; i += 1) {
    const upperWall = allWalls.create(0, 0, 'wall').setOrigin(0, 1);
    const lowerWall = allWalls.create(0, 0, 'wall').setOrigin(0, 0);

    placeWalls(upperWall, lowerWall);
  }

  allWalls.setVelocityX(-200);

  this.input.on('pointerdown', up);

  spaceBar.on('down', up);
}

function update(time, delta) {
  if (plane.y > config.height || plane.y < -plane.height) {
    restartPosition();
  }
  recycleWalls();
}

function placeWalls(uWall, lWall) {
  const rightMostX = getRightMostWall();
  const wallVertDist = Phaser.Math.Between(...wallVertDistRange);
  const wallVertPos = Phaser.Math.Between(0 + 20, config.height - 20 - wallVertDist);
  const wallHorizontalDist = Phaser.Math.Between(...wallHorizontalDistRange);

  uWall.x = rightMostX + wallHorizontalDist;
  uWall.y = wallVertPos;

  lWall.x = uWall.x;
  lWall.y = uWall.y + wallVertDist;
}

function recycleWalls() {
  const tempWalls = [];
  allWalls.getChildren().forEach((wall) => {
    if (wall.getBounds().right <= 0) {
      tempWalls.push(wall);
      if (tempWalls.length === 2) {
        placeWalls(...tempWalls);
      }
    }
  });
}

function getRightMostWall() {
  let rightMostX = 0;

  allWalls.getChildren().forEach((wall) => {
    rightMostX = Math.max(wall.x, rightMostX);
  });

  return rightMostX;
}

new Phaser.Game(config);
