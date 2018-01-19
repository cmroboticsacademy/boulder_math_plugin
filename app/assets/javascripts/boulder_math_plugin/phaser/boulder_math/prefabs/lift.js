var Lift = function(game, x, y, maxHeight, physics) {
    key = 'lift';
    physics = true;
    frame = 0;
    Phaser.Sprite.call(this, game, x,y, key, frame);
    game.physics.enable(this);
    if (physics) {
      this.body.gravity = 0;
      this.body.immovable = true;
      if (maxHeight) {
          this.movable = true;
      }
    }
    this.maxHeight = maxHeight;
};



Lift.prototype = Object.create(Phaser.Sprite.prototype);
Lift.prototype.constructor = Lift;
