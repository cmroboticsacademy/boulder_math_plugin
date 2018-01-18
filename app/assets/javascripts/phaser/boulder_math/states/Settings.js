BoulderMath.Settings = function() {};

BoulderMath.Settings.prototype = {
    create: function() {
        //Background and button
        background = game.add.tileSprite(0,0,1600,3200,'settings-background');
        exit = game.add.button(game.width/2,game.height - 150,'exit',this.gameMenu, this, 1,0,2);
        exit.anchor.setTo(0.5);

        //Gui elements
        textStyle = {font: '18pt Arial', fill: '#fff'};
        game.add.text((game.width/2)-320,170,"Difficulty", textStyle);
        difficulty = new radioButtons(['Easy','Medium','Hard'],185,200);
        difficulty.setState(gameDifficulty);

        game.add.text((game.width/2)-320,320,"Background", textStyle );
        backgroundSetting =  new radioButtons(['Daytime','Afternoon','Night'],185,350);
        backgroundSetting.setState(gameBackground);

        Sound = game.add.checkbox((game.width/2) - 320,500, {text: 'Sound FX', style: {fill: '#ffffff', font: '18pt Arial'}}, 'checkBox');
        Sound.state = sound;

        Sound.events.onInputUp.add(function (elm, pointer) {
            sound = Sound.state;
        }, this);

    },

    update: function() {


    },

    gameMenu: function() {
      gameBackground = backgroundSetting.state();
      gameDifficulty = difficulty.state();
      this.state.start('MainMenu');
    }
};
