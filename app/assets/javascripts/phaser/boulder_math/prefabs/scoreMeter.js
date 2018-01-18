//Define Score Meter Object
var scoreMeter = function(game,offset) {
    var key = 'scoreMeter';
    frame = 1;
    Phaser.Sprite.call(this, game, 796 + offset, 0, key,frame);
    this.fixedToCamera = true;
};

scoreMeter.prototype = Object.create(Phaser.Sprite.prototype);
scoreMeter.prototype.constructor = scoreMeter;

// Score Meter Methods
this.scoreMeter.prototype.activate = function() {
    this.frame = 0;
};
this.scoreMeter.prototype.deactivate = function() {
    this.frame = 1;
};




// Define Score Display
var scoreDisplay = function(){};

// propertioes
scoreDisplay.prototype.scoreMeterGroup = null;
scoreDisplay.prototype.score = 0;

//methods
scoreDisplay.prototype.create = function() {
    var scoreIcons = [];
    this.scoreMeterGroup = game.add.group();
    for (var i = 0; i < 5; i++) {
      sm = new scoreMeter(game, i * 42);
      this.scoreMeterGroup.add(sm);
    }
};

scoreDisplay.prototype.incrementScore = function () {
   this.score += 1;
   scoreMeterInstance = this.scoreMeterGroup.children[this.score - 1];
   scoreMeterInstance.activate();
};








