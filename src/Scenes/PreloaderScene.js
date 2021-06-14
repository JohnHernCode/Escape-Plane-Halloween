import 'phaser';
import myLogo from '../assets/logo.png';
import btnRed from '../assets/Btn.png';
import bgM from '../assets/monsters.mp3';
import checked from '../assets/UI/play.png';
import unchecked from '../assets/UI/pause.png';
import idle from '../assets/character/Animations/Standing/NinjaCat_idle_01.png';
import lv1 from '../assets/crystal_world_map.json';
import lv1t2 from '../assets/main_lev_build_2.png';
import lv1t1 from '../assets/main_lev_build_1.png';

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
    this.load.audio('bgMusic', [bgM]);
    this.load.image('box', unchecked);
    this.load.image('checkedBox', checked);
    this.load.image('player', idle);
    this.load.image('tile2', lv1t2);
    this.load.tilemapTiledJSON('map', lv1);
    this.load.image('tile1', lv1t1);
    this.load.image('tile2', lv1t2);
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
