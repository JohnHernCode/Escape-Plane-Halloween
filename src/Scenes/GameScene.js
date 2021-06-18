/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import Player from '../entities/Player';
import config from '../Config/config';
import Enemies from '../groups/Enemies';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);
    const player = this.createPlayer(playerZones.start);
    const enemies = this.createEnemies(layers.enemySpawns, layers.platformsColliders);
    this.createEnemyColliders(enemies, {
      colliders: {
        platformsColliders: layers.platformsColliders, player,

      },
    });
    this.createPlayerColliders(player, {
      colliders: {
        platformsColliders: layers.platformsColliders,

      },
    });
    this.createEndOfLevel(playerZones.end, player);
    this.setupFollowupCameraOn(player);
  }

  finishDrawing(pointer, layer) {
    this.line.x2 = pointer.worldX;
    this.line.y2 = pointer.worldY;

    this.graphics.clear();
    this.graphics.strokeLineShape(this.line);

    this.tileHits = layer.getTilesWithinShape(this.line);

    if (this.tileHits.length > 0) {
      this.tileHits.forEach((tile) => {
        if (tile.index !== -1) {
          tile.setCollision(true);
        }
      });
    }
    this.plotting = false;
  }

  createMap() {
    const map = this.make.tilemap({ key: 'map' });
    map.addTilesetImage('main_lev_build_1', 'tile1');
    return map;
  }

  createLayers(map) {
    const tiles = map.getTileset('main_lev_build_1');
    const platformsColliders = map.createLayer('platform_colliders', tiles);
    const environment = map.createLayer('environment', tiles);
    const platforms = map.createLayer('platforms', tiles);
    const playerZones = map.getObjectLayer('player_zones');
    const enemySpawns = map.getObjectLayer('enemy_spawns');
    platformsColliders.setCollisionByProperty({ collides: true });
    return {
      environment, platforms, platformsColliders, playerZones, enemySpawns,
    };
  }

  createPlayer(start) {
    return new Player(this, start.x, start.y).setScale(0.35);
  }

  createEnemies(spawnLayer, platformsColliders) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();
    spawnLayer.objects.forEach((spawnPoint) => {
      const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y);
      enemy.setPlatformColliders(platformsColliders);
      enemies.add(enemy);
    });
    return enemies;
  }

  createPlayerColliders(player, { colliders }) {
    player
      .addCollider(colliders.platformsColliders);
  }

  createEnemyColliders(enemies, { colliders }) {
    enemies
      .addCollider(colliders.platformsColliders)
      .addCollider(colliders.player);
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
    const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
      .setSize(5, 1200)
      .setAlpha(0);
    const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      eolOverlap.active = false;
    });
  }
}
