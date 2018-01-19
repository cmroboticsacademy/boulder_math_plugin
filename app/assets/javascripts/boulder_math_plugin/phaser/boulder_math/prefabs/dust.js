var Dust = function (game, x, y, key,frame) {
    Phaser.Sprite.call(this, game, x,y, 'dust', frame);
    this.animations.add('poof');

    this.start_poof = function () {
      this.animations.play('poof', 26, false);
    };
};

Dust.prototype = Object.create(Phaser.Sprite.prototype);
Dust.prototype.constructor = Lift;
