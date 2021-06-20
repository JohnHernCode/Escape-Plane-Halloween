/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import BaseScene from './BaseScene';
import BG from '../assets/BG.png';
import planeGuy from '../assets/Plane/FlyScaled.png';
import walls from '../assets/Tiles/walls.png';
import pause from '../assets/Pause_BTNScale.png';

const WALLS_TO_RENDER = 4;

export default class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);

    this.plane = null;
    this.allWalls = null;
    this.isPaused = false;

    this.VELOCITY = 200;

    this.upVelocity = 300;

    this.wallHorizontalDist = 0;
    this.currentDifficulty = 'easy';
    this.difficulties = {
      easy: {
        wallHorizontalDistRange: [300, 350],
        wallVertDistRange: [150, 200],
      },
      normal: {
        wallHorizontalDistRange: [280, 330],
        wallVertDistRange: [140, 190],
      },
      hard: {
        wallHorizontalDistRange: [250, 310],
        wallVertDistRange: [50, 100],
      },
    };
    this.score = 0;
    this.scoreText = '';
  }

  preload() {
    this.load.image('bg', BG);
    this.load.image('plane', planeGuy);
    this.load.image('wall', walls);
    this.load.image('pause', pause);
  }

  create() {
    this.currentDifficulty = 'easy';
    super.create();
    this.createBG();
    this.createPlane();
    this.createWalls();
    this.createColliders();
    this.handleInputs();
    this.createScore();
    this.createPause();
    this.listenToEvents();
  }

  update() {
    this.checkGameStatus();
    this.recycleWalls();
  }

  listenToEvents() {
    if (this.pauseEvent) { return; }

    this.pauseEvent = this.events.on('resume', () => {
      this.initialTime = 3;
      this.countDownText = this.add.text(...this.screenCenter, `Fly in: ${this.initialTime}`, this.fontOptions).setOrigin(0.5);
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.countDown,
        callbackScope: this,
        loop: true,
      });
    });
  }

  countDown() {
    this.initialTime -= 1;
    this.countDownText.setText(`Fly in: ${this.initialTime}`);
    if (this.initialTime <= 0) {
      this.isPaused = false;
      this.countDownText.setText('');
      this.physics.resume();
      this.timedEvent.remove();
    }
  }

  createBG() {
    this.add.image(this.config.width / 2, this.config.height / 2, 'bg');
  }

  createPlane() {
    this.plane = this.physics.add.sprite(
      this.config.startPosition.x, this.config.startPosition.y, 'plane',
    ).setOrigin(0);
    this.plane.body.gravity.y = 600;
    this.plane.setCollideWorldBounds(true);
  }

  createWalls() {
    this.allWalls = this.physics.add.group();

    for (let i = 0; i < WALLS_TO_RENDER; i += 1) {
      const upperWall = this.allWalls.create(0, 0, 'wall')
        .setImmovable(true)
        .setOrigin(0, 1);
      const lowerWall = this.allWalls.create(0, 0, 'wall')
        .setImmovable(true)
        .setOrigin(0, 0);

      this.placeWalls(upperWall, lowerWall);
    }

    this.allWalls.setVelocityX(-200);
  }

  createColliders() {
    this.physics.add.collider(this.plane, this.allWalls, this.gameOver, null, this);
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem('bestScore');
    this.scoreText = this.add.text(16, 16, `Score: ${0}`, { fontSize: '32px', fill: '#000' });
    this.add.text(16, 52, `Best score: ${bestScore || 0}`, { fontSize: '18px', fill: '#000' });
  }

  createPause() {
    this.isPaused = false;
    const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause')
      .setInteractive()
      .setScale(2)
      .setOrigin(1);
    pauseButton.on('pointerdown', () => {
      this.isPaused = true;
      this.physics.pause();
      this.scene.pause();
      this.scene.launch('PauseScene');
    });
  }

  handleInputs() {
    this.input.on('pointerdown', this.up, this);
    const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    spaceBar.on('down', this.up, this);
  }

  checkGameStatus() {
    if (this.plane.getBounds().bottom >= this.config.height || this.plane.y <= 0) {
      this.gameOver();
    }
  }

  placeWalls(uWall, lWall) {
    const difficulty = this.difficulties[this.currentDifficulty];
    const rightMostX = this.getRightMostWall();
    const wallVertDist = Phaser.Math.Between(...difficulty.wallVertDistRange);
    const wallVertPos = Phaser.Math.Between(0 + 20, this.config.height - 20 - wallVertDist);
    const wallHorizontalDist = Phaser.Math.Between(...difficulty.wallHorizontalDistRange);

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
          this.increaseScore();
          this.saveBestScore();
          this.increaseDifficulty();
        }
      }
    });
  }

  increaseDifficulty() {
    if (this.score === 1) {
      this.currentDifficulty = 'normal';
    }

    if (this.score === 3) {
      this.currentDifficulty = 'hard';
    }
  }

  getRightMostWall() {
    let rightMostX = 0;

    this.allWalls.getChildren().forEach((wall) => {
      rightMostX = Math.max(wall.x, rightMostX);
    });

    return rightMostX;
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score);
    }
  }

  gameOver() {
    this.physics.pause();
    this.plane.setTint(0xEE4824);
    this.saveBestScore();
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }

  up() {
    if (this.isPaused) { return; }
    this.plane.body.velocity.y = -this.upVelocity;
  }

  increaseScore() {
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }
}
