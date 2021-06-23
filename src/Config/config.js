import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1200,
  height: 608,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
};
