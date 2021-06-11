import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  scale: {
    parent: 'phaser-example',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
};
