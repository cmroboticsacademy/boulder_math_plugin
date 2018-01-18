var Dust = function (game, x=0, y=0, key='dust',frame=0) {
    Phaser.Sprite.call(this, game, x,y, key, 0);
    this.animations.add('poof');

    this.start_poof = function () {
      this.animations.play('poof', 26, false);
    };
};

Dust.prototype = Object.create(Phaser.Sprite.prototype);
Dust.prototype.constructor = Lift;
