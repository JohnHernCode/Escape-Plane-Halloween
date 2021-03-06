import 'phaser';
import myLogo from '../assets/logo.png';
import btnRed from '../assets/Btn.png';
import bgM from '../assets/DOSSD.mp3';
import checked from '../assets/Objects/ArrowSign.png';
import unchecked from '../assets/Objects/Sign.png';
import BG from '../assets/BG.png';
import walls from '../assets/Tiles/walls.png';
import backButton from '../assets/Backward_BTNScale.png';
import planeSprite from '../assets/planesprite.png';
import backButton2 from '../assets/BtnBK.png';
import leaderBoard from '../assets/BtnLB.png';

// eslint-disable-next-line no-undef
export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
    this.bgmPlaying = false;
  }

  preload() {
    this.load.image('bg', BG);
    this.add.image(0, 0, 'bg').setOrigin(0);
    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(420, 270, 320, 50);

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
      progressBar.fillRect(430, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Counting Cards: ${file.key}`);
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
    this.load.audio('bgMusic', bgM);
    this.load.image('box', unchecked);
    this.load.image('checkedBox', checked);
    this.load.image('bg', BG);
    this.load.spritesheet('plane', planeSprite, {
      frameWidth: 116, frameHeight: 80,
    });
    this.load.image('wall', walls);
    this.load.image('back', backButton);
    this.load.image('bkBtn', backButton2);
    this.load.image('leader', leaderBoard);
  }

  create() {
    this.bgm = this.sound.add('bgMusic');
    if (this.bgmPlaying === false) {
      this.bgm.play();
      this.bgmPlaying = true;
    }
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
}
