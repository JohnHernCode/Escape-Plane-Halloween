import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  MAP_WIDTH: 1600,
  width: document.body.offsetWidth,
  height: 608,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
};
