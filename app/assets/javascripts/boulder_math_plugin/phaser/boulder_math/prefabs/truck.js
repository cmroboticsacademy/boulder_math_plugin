var Truck = function(game, x, y, key, frame, physics, camera_follow) {

    if (camera_follow == null) {
      camera_follow = true;
    }

    if (physics == null) {
      physics = true;
    }


    Phaser.Sprite.call(this, game, x, y, 'truck', frame);
    this.scale.setTo(0.75);
    this.animations.add('truck_move', [0,1,2,3,4,5]);
    this.animations.add('truck_move_reverse', [5,4,3,2,1,0]);

    if (physics) {
      this.game.physics.arcade.enableBody(this);
      this.body.collideWorldBounds = true;
      this.body.bounce.set(0.1);
      this.body.drag.set(50);
    }

    if(camera_follow==true) {
        game.camera.follow(this);
    }


    //Sounds
    this.motorSound = game.add.audio('motorSound');
    this.motorSound.stop();

    this.cautionBeep = game.add.audio('reverseCaution');
    this.cautionBeep.stop();

    this.stop_motion = function() {
        this.motorSound.stop();
        this.cautionBeep.stop();
        this.frame = 0;
        this.animations.stop();
    }

    this.start_motion = function() {
        this.motorSound.play('',0,0.15,true);
        this.animations.play('truck_move', 14,true);
    }

    this.start_motion_reverse = function () {
      this.motorSound.play('',0,0.15,true);
      this.cautionBeep.play('',0, 0.05, true);
      this.animations.play('truck_move_reverse', 14,true);
    }

    //precise movement
    this.moveTo = function(xPos,checkCalc) {

        if (checkCalc == null) {
          checkCalc = true;
        }

        var result = this.x - xPos;
        var multiplier = 6;
        if(result < 0){
            truck.start_motion();
            result = (xPos - this.x)*multiplier;
        }
         else{
            truck.start_motion_reverse();
            result = (this.x - xPos)*multiplier;
        }

        tween = game.add.tween(this).to( {x: xPos}, result, Phaser.Easing.Linear.None, true);
        signal = tween.onComplete;
        signal.add(stopAndCheck,this);
        function stopAndCheck () {
           robotMoving = false;
           truck.stop_motion();
           if(checkCalc) {
               gameResult = currentChallenge.checkCalculation(xPos);
               if(gameResult != "correct" && gameResult != "win" ) {
                   game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {game.state.start("LoseScene")}, this);
                   liftActive = false;
                   liftSound.stop();
               } else if(gameResult == "win") {
                   game.time.events.add(Phaser.Timer.SECOND * 2, function () {game.state.start("WinScene")}, this);
                   liftActive = false;
                   liftSound.stop();
               }
           }
        }
    }
};


Truck.prototype = Object.create(Phaser.Sprite.prototype);
Truck.prototype.constructor = Truck;
