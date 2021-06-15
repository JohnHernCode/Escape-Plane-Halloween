import Phaser from 'phaser';
import Player from '../entities/Player';
import config from '../Config/config';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);
    const player = this.createPlayer(playerZones.start);
    this.createPlayerColliders(player, {
      colliders: {
        platformsColliders: layers.platformColliders,

      },
    });
    this.createEndOfLevel(playerZones.end, player);
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
    const playerZones = map.getObjectLayer('player_zones');
    platformColliders.setCollisionByProperty({ collides: true });
    return {
      environment, platforms, platformColliders, playerZones,
    };
  }

  createPlayer(start) {
    return new Player(this, start.x, start.y).setScale(0.5);
  }

  createPlayerColliders(player, { colliders }) {
    player
      .addCollider(colliders.platformsColliders);
  }

  setupFollowupCameraOn(player) {
    const { height, width, MAP_WIDTH } = config;
    const offset = MAP_WIDTH - width;
    this.physics.world.setBounds(0, 0, width + offset, height + 200);
    this.cameras.main.setBounds(0, 0, width + offset, height).setZoom(1.5);
    this.cameras.main.startFollow(player);
  }

  getPlayerZones(playerZonesLayer) {
    const playerZone = playerZonesLayer.objects;
    return {
      start: playerZone.find((zone) => zone.name === 'startZone'),
      end: playerZone.find((zone) => zone.name === 'endZone'),
    };
  }

  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add.sprite(end.x, end.y, 'Restart')
      .setSize(5, this.config.height * 2)
      .setAlpha(0);
    const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      eolOverlap.active = false;
    });
  }
}
