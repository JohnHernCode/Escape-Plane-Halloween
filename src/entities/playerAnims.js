export default (anims) => {
  anims.create({
    key: 'idle',
    frames: anims.generateFrameNumbers('player', { start: 0, end: 1 }),
    frameRate: 4,
    repeat: -1,
  });
  anims.create({
    key: 'run',
    frames: anims.generateFrameNumbers('player', { start: 8, end: 14 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'jump',
    frames: anims.generateFrameNumbers('player', { start: 2, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });
};
