BoulderMath.Preload = function() {
  this.ready = false;
};

BoulderMath.Preload.prototype = {
  preload: function() {

    //Load Sprite Sheets
    this.load.spritesheet('arrow', '/phaser/assets/images/sprites/ArrowSheet.png',64,64,8);
    this.load.spritesheet('truck', '/phaser/assets/images/sprites/TruckSprites.png', 128, 128, 6);
    this.load.spritesheet('truck256', '/phaser/assets/images/sprites/TruckSprites256.png', 256, 256, 6);
    this.load.spritesheet('lift', '/phaser/assets/images/sprites/Lift.png');
    this.load.spritesheet('scoreMeter', '/phaser/assets/images/sprites/InGameMenu/scoreMeter.png',64, 64, 2);
    this.load.spritesheet('tileSprites', '/phaser/assets/images/tile_sheets/BoulderMath_TileSheet.png',64, 64, 40);
    this.load.spritesheet('dust', '/phaser/assets/images/sprites/DustSpriteSheet.png', 512, 512);

    //Load Buttons
    this.load.spritesheet('radioBtn', '/phaser/assets/images/sprites/MainMenu/RadioButton_Sprite.png',32,32,2);
    this.load.spritesheet('checkBox','/phaser/assets/images/sprites/MainMenu/CheckMark_Sprite.png',32,32,2);
    this.load.spritesheet('start', '/phaser/assets/images/sprites/MainMenu/NewGame_btn.png');
    this.load.spritesheet('exit', '/phaser/assets/images/sprites/MainMenu/Exit_btn.png');
    this.load.spritesheet('settings', '/phaser/assets/images/sprites/MainMenu/Settings_btn.png');
    this.load.spritesheet('try_again_btn', '/phaser/assets/images/sprites/InGameMenu/TryAgain_btn.png');
    this.load.spritesheet('try_again_btn', '/phaser/assets/images/sprites/InGameMenu/TryAgain_btn.png');
    this.load.spritesheet('try_again_btn', '/phaser/assets/images/sprites/InGameMenu/TryAgain_btn.png');
    this.load.spritesheet('run_btn','/phaser/assets/images/sprites/InGameMenu/Run.png');
    this.load.spritesheet('forward_input', '/phaser/assets/images/sprites/InGameMenu/ForwardInput.png');
    this.load.spritesheet('home', '/phaser/assets/images/sprites/InGameMenu/Home.png');
    this.load.spritesheet('fs', '/phaser/assets/images/sprites/InGameMenu/MaximizeScreen.jpg');


    //Load Numpad Buttons
    this.load.spritesheet('0_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/0.png');
    this.load.spritesheet('1_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/1.png');
    this.load.spritesheet('2_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/2.png');
    this.load.spritesheet('3_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/3.png');
    this.load.spritesheet('4_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/4.png');
    this.load.spritesheet('5_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/5.png');
    this.load.spritesheet('6_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/6.png');
    this.load.spritesheet('7_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/7.png');
    this.load.spritesheet('8_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/8.png');
    this.load.spritesheet('9_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/9.png');
    this.load.spritesheet('+_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/Add.png');
    this.load.spritesheet('/_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/Divide.png');
    this.load.spritesheet('-_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/Subtract.png');
    this.load.spritesheet('*_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/Multiply.png');
    this.load.spritesheet('clr_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/Clear.png');
    this.load.spritesheet('._btn','/phaser/assets/images/sprites/InGameMenu/NumPad/Point.png');
    this.load.spritesheet('(_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/OpenBracket.png');
    this.load.spritesheet(')_btn','/phaser/assets/images/sprites/InGameMenu/NumPad/CloseBracket.png');

    //Load Modals
    this.load.spritesheet('success_modal', '/phaser/assets/images/sprites/InGameMenu/Success-Message.png');
    this.load.spritesheet('incorrect_modal','/phaser/assets/images/sprites/InGameMenu/Incorrect-Message.png');
    this.load.spritesheet('complete_modal', '/phaser/assets/images/sprites/InGameMenu/Level1Complete-Message.png');
    this.load.spritesheet('blank_modal', '/phaser/assets/images/backgrounds/modal.png');

    //Load Backgrounds
    this.load.image('menu-background','/phaser/assets/images/backgrounds/MainMenu_BG.jpg');
    this.load.image('Daytime','/phaser/assets/images/backgrounds/BackgroundDay.jpg');
    this.load.image('Afternoon','/phaser/assets/images/backgrounds/Background2.jpg');
    this.load.image('Night','/phaser/assets/images/backgrounds/Background3.jpg');
    this.load.image('settings-background','/phaser/assets/images/backgrounds/Settings_BG.jpg');

    //Load Tile Sheets
    this.load.image('tiles', '/phaser/assets/images/tile_sheets/BoulderMath_TileSheet.png');
    this.load.image('brick480', '/phaser/assets/images/tile_sheets/BrickTexture_HiRes.png');

    //Load Tile Maps
    this.load.tilemap('boulder_math1', '/phaser/assets/images/tile_maps/Boulder_Math.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('boulder_math2', '/phaser/assets/images/tile_maps/Boulder_Math2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('boulder_math3', '/phaser/assets/images/tile_maps/Boulder_Math3.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('boulder_math4', '/phaser/assets/images/tile_maps/Boulder_Math4.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('boulder_math5', '/phaser/assets/images/tile_maps/Boulder_Math5.json', null, Phaser.Tilemap.TILED_JSON);

    //Load Plugins
    this.add.plugin(PhaserInput.Plugin);

    //Load Audio
    //change music before release!!!
    this.load.audio('introMusic','/phaser/assets/audio/introPlaceholder.mp3');
    this.load.audio('gameMusic', '/phaser/assets/audio/gamePlaceholder.mp3');
    this.load.audio('liftSound','/phaser/assets/audio/custom/Lift.mp3');
    this.load.audio('motorSound', '/phaser/assets/audio/custom/motor.mp3');
    this.load.audio('reverseCaution','/phaser/assets/audio/custom/cautionBeep.mp3');
    this.load.audio('correct','/phaser/assets/audio/custom/success.mp3');
    this.load.audio('wrong', '/phaser/assets/audio/custom/fail.mp3')

    this.load.onLoadComplete.add(this.onLoadComplete, this);
  },
  create: function() {
  },
  update: function() {
    if(this.ready === true && this.cache.isSoundDecoded('introMusic') && this.cache.isSoundDecoded('gameMusic')) {
      this.state.start('MainMenu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};
