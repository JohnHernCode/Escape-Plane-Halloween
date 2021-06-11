import 'phaser';
import myLogo from '../assets/logo.png';
import btnRed from '../assets/Btn.png';
import bgM from '../assets/monsters.mp3';
import checked from '../assets/UI/play.png';
import unchecked from '../assets/UI/pause.png';

// eslint-disable-next-line no-undef
export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Washing the car while loading: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('button1', btnRed);
    this.load.image('button2', btnRed);
    this.load.image('logo', myLogo);
    this.anims.create({
      key: 'kick',
      frameRate: 7,
      frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 3 }),
      repeat: -1,
    });
    const kick = this.add.sprite(150, 300, 'cat');
    kick.play('kick');
    this.load.audio('bgMusic', [bgM]);
    this.load.image('box', unchecked);
    this.load.image('checkedBox', checked);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }

  create() {
  }
}
