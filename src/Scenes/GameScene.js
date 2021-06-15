import Phaser from 'phaser';
import Player from '../entities/Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const player = this.createPlayer();
    this.createPlayerColliders(player, {
      colliders: {
        platformsColliders: layers.platformColliders,

      },
    });

    this.setupFollowupCameraOn(player);
  }

  createMap() {
    const map = this.make.tilemap({ key: 'map' });
    map.addTilesetImage('main_lev_build_1', 'tile1');
    return map;
  }

  createLayers(map) {
    const tiles = map.getTileset('main_lev_build_1');
    const platformColliders = map.createLayer('platform_colliders', tiles);
    const environment = map.createLayer('environment', tiles);
    const platforms = map.createLayer('platforms', tiles);
    platformColliders.setCollisionByProperty({ collides: true });
    return { environment, platforms, platformColliders };
  }

  createPlayer() {
    return new Player(this, 100, 250).setScale(0.5);
  }

  createPlayerColliders(player, { colliders }) {
    player
      .addCollider(colliders.platformsColliders);
  }

  setupFollowupCameraOn(player) {
    this.cameras.main.startFollow(player);
  }
}
