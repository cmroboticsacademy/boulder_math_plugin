BoulderMath = function () {};

BoulderMath.Boot = function() {};

BoulderMath.Boot.prototype = {
  preload: function() {
    game.canvas.style.margin = 'auto';
  },
  create: function() {
    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;
    this.state.start('Preloader');
    //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  }
};
