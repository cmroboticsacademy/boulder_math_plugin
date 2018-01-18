var speed = 5;
var jumpTimer = 0;
var distance_txt = [];
var distance = 0;
var liftActive = false;
var position = 0;
var map,layer,currentLift,currentChallenge,startOfChallenge;
var offCameraChallenge=true;
var robotMoving=false;
var attempts = 0;


BoulderMath.Game = function() {
};

BoulderMath.Game.prototype = {
    create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 500;
    backgroundGame = game.add.tileSprite(0,0,1600,3200,gameBackground);

    //randomize and create layout
    //randomizeLayout();
    randomizeLayout();

    //Create Target Distances Group to set collisions
    distances = this.game.add.group();

    //Score Display
    sd = new scoreDisplay();
    sd.create();
    for(i = 0;i < score;i++){
        sd.incrementScore();
        currentChallenge.completed = true;
        currentChallenge = challenges.active();
    };
    currentChallenge.displayPrompt();

    //Truck Sprite
    trucks = this.game.add.group();
    truck = new Truck(this.game, currentChallenge.startPos[0],currentChallenge.startPos[1]);
    trucks.add(truck);
    truck.stop_motion();

    arrows = this.game.add.group();

    // Target Distances
    textStyle = {font: 'bold 18pt Arial', fill: 'white'};

    for (i = 0; i < layout.challenge_positions.length; i++) {

      distance_txt[i] = game.add.text(layout.challenge_positions[i][1][0] + 35, layout.challenge_positions[i][1][1], Math.round(layout.challenge_positions[i][1][0] - truck.x).toString() + " ft", textStyle);

      // Text Physics
      distance_txt[i].anchor.setTo(0,1);
      distance_txt[i].fixedToCamera = false;
      game.physics.enable(distance_txt[i]);
      distance_txt[i].body.gravity = 0;
      distance_txt[i].immovable = true;
      distances.add(distance_txt[i]);
      //  distances.add(arrow[i]);
    }

    challenges.collection.forEach( function (elem) {
      arrow = new Arrow(this.game, elem.endPos[0] + 30, elem.endPos[1]-100);
      arrow.start_spin();
      arrows.add(arrow);
    });


    //Control Panel
    createControlPanel();

    //input focus

    input.startFocus();


    //Popup Modal
    popup_modal = new PopupModal(this.game);

    //sound fx
    if (sound) {
      game.sound.mute = false;
    } else {
      game.sound.mute = true;
    }

    liftSound = game.add.audio('liftSound');
    liftSound.stop();

    //Home Button
    home = game.add.button(10,10, 'home', this.mainMenu, this, 1,0,2);
    home.scale.setTo(0.75);
    home.fixedToCamera = true;

    //Full Screen
    fs = game.add.button(965,720, 'fs', this.gofull, this, 1, 0, 2);
    fs.scale.setTo(0.75);
    fs.fixedToCamera = true;

    startOfChallenge = true;


  },

  update: function() {

    // Debug purposes only. Allows truck to move freely
    //  if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
    //    truck.body.velocity.x -= speed;
    //  }else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    //    truck.body.velocity.x += speed;
    //  };


    if(game.scale.isFullScreen) {
      fs.visible = false;
    } else {
      fs.visible = true;
    }

    if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) && robotMoving == false) {
      this.moveForward();
    };

    // Pan camera if current challenge is off camera
    if(startOfChallenge && (truck.position.x == currentChallenge.startPos[0]) && (game.camera.position.y != 0 || challenges.activeIndex() == 4)) {
        startOfChallenge = false;
        if(currentChallenge.endPos[0] < game.camera.x || currentChallenge.endPos[0] > 1024) {
            tween = game.add.tween(game.camera).to({x: 576 * currentChallenge.direction}, 4000, Phaser.Easing.Linear.None, true,100,0,true);
            game.camera.unfollow(truck);
            signal = tween.onComplete;
            signal.add(function () {game.camera.follow(truck)}, self);
        }
    };

    // Move Lift
    if(layout.currentLift.movable && layout.currentLift.y > layout.currentLift.maxHeight && liftActive) {
        truck.body.velocity.x = 0;
        layout.currentLift.body.y -= 2;
        if(!liftSound.isPlaying){
          liftSound.play('',0,0.25,true);
        }
    }else{
        if (liftActive == true) {
            truck.moveTo(currentChallenge.startPos[0], false);
        }
        liftActive = false;
        liftSound.stop();
    }

    // Update distances to challenge targets
    for (i = 0; i < layout.challenge_positions.length; i++) {
        distance_txt[i].setText(Math.round((layout.challenge_positions[i][1][0] - truck.x)/pixel_scale).toString() + " ft");
    }

    game.physics.arcade.collide(trucks, layer);
    game.physics.arcade.collide(trucks, lifts,this.onLift, null, this);
    game.physics.arcade.overlap(trucks, distances,this.onDistance, null, this);

  },

  gofull: function () {
    if (game.scale.isFullScreen)
    {
      game.scale.stopFullScreen();
    }
    else
    {
      game.scale.startFullScreen(false);
    }
  },

  moveForward: function() {
    robotMoving = true;
    currentChallenge.killPrompt();

    //Validate Input
    re = /^(?:(\d+|\W+))*$/;
    inputVal = input.value;
    Ok = re.exec(inputVal);
    if (!Ok | inputVal == "") {
      window.alert("Enter a valid number!")
    } else {
      wheel_rotations = eval(inputVal);
      position = (wheel_rotations * wheel_size * pixel_scale) + currentChallenge.startPos[0];
      truck.moveTo(position);
    }

    input.setText("");
    input.startFocus();
  },

  onDistance: function(truck,text) {
      text.kill();
      arrows.children[challenges.activeIndex()].kill();
  },

  onLift: function(truck, lift) {
    layout.currentLift = lift;
    if(lift.movable && lift.maxHeight != lift.y && gameResult == "correct") {
      liftActive = true;
    }
  },

  createLifts: function(params) {
    lifts.add(new Lift(game,params[0], params[1], params[2]));
    return true;
  },

  mainMenu: function () {
    game.state.start("MainMenu");
  },

  // render boundary box
  render: function () {
    //game.debug.cameraInfo(game.camera, 32,32);
    // this.game.debug.spriteBounds(arrow);
    //this.game.debug.spriteBounds(lifts.children[0]);
  }

}
