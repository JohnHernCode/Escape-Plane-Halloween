import Phaser from 'phaser';
import lv1 from '../assets/crystal_world_map.json';
import lv1t1 from '../assets/main_lev_build_1.png';
import lv1t2 from '../assets/main_lev_build_2.png';
import Player from '../entities/Player';
import idle from '../assets/character/Animations/Standing/NinjaCat_idle_01.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.tilemapTiledJSON('map', lv1);
    this.load.image('tile1', lv1t1);
    this.load.image('tile2', lv1t2);
    this.load.image('player', idle);
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const player = this.createPlayer();
    this.physics.add.collider(player, layers.platformColliders);
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
    return new Player(this, 100, 250).setScale(0.27);
  }
}
