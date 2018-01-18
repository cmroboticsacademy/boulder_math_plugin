BoulderMath.MainMenu = function() {
};

BoulderMath.MainMenu.prototype = {
  create: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 200;

    backgroundMenu = this.game.add.tileSprite(0,0,1280,1024,'menu-background');

    startButton = game.add.button(game.width/2,300, 'start', startGame, this, 1,0,2);
    startButton.anchor.setTo(0.5);

    settingsButton = game.add.button(game.width/2, 375, 'settings', settings, this, 1, 0, 2);
    settingsButton.anchor.setTo(0.5);


    function startGame() {
        this.state.start('Game');
    }

    function settings() {
        this.state.start('Settings');
    }


  }


};
