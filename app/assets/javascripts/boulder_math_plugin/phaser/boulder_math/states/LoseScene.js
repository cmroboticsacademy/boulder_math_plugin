BoulderMath.LoseScene = function () {};

BoulderMath.LoseScene.prototype = {

    create: function () {

      backgroundGame = game.add.tileSprite(0,0,1600,3200,gameBackground);

      this.truck = new Truck(game, 0, 0, 'truck256', undefined, false, false);
      this.lift = new Lift(game, 0, 0, false);
      this.lift.anchor.set(0.5, 0);
      this.lift.scale.setTo(3);
      this.wall1 = game.add.sprite(0, 0, 'brick480');
      this.wall2 = game.add.sprite(0, 0, 'brick480');
      this.dust = new Dust(game);
      this.dust.anchor.setTo(.5);

      trucks = game.add.group();
      trucks.add(this.truck);
      scene = game.add.group();
      scene.add(this.lift);
      scene.add(this.wall1);
      scene.add(this.wall2);
      scene.add(this.dust);

      // this.dust.start_poof();

      switch(gameResult) {
          case "short":
              this.scene2(currentChallenge.direction == 0);
              break;
          case "long":
              this.scene4(currentChallenge.direction == 0)
              break;
          case "shortHalf":
              this.scene1(currentChallenge.direction == 0);
              break;
          case "longHalf":
              this.scene3(currentChallenge.direction ==  0);
              break;
      }
    },

    // false: truck comes up short, half/half
    // true: truck backs up and slightly overshoots, half/half
    scene1: function (dirReverse) {
      self = this;
      this.truck.anchor.set(0, 1);

      if (dirReverse) {
        this.truck.x = this.game.width;
      } else {
        this.truck.x = 0 - this.truck.width;
      }

      this.truck.y = this.game.height * 0.65;
      this.lift.x = this.game.width * 0.65;
      this.lift.y = this.game.height * 0.65;
      this.wall1.y = this.game.height * 0.65;
      this.wall2.x = this.game.width * 0.835;
      this.wall2.y = this.game.height * 0.65;
      this.dust.x = this.game.width * 0.37;
      this.dust.y = this.game.height * 0.55;

      fwdAnim();

      function fwdAnim() {
        fwdParams = {x: self.game.width * .35};
        fwdTween = game.add.tween(self.truck).to(fwdParams, 3000, Phaser.Easing.Linear.None);

        if (dirReverse) {
          self.truck.start_motion_reverse();
        } else {
          self.truck.start_motion();
        }

        fwdTween.onComplete.add(flipAnim, self);
        fwdTween.start();
      }

      function flipAnim() {
        flipParams = {angle: -80, x: self.truck.x + 60, y: self.truck.y + 30};
        flipTween = game.add.tween(self.truck).to(flipParams, 1000, Phaser.Easing.Bounce.Out);
        self.truck.stop_motion();
        flipTween.onStart.add(liftAnim, self);
        flipTween.onComplete.add(this.killTruck, self);
        flipTween.onComplete.add(this.poof, self);
        flipTween.start();
      }

      function liftAnim() {
        self.truck.motorSound.stop();
        liftParams = {y: 0 - self.lift.height};
        liftTween = game.add.tween(self.lift).to(liftParams, 2000, Phaser.Easing.Linear.None);
        liftTween.onComplete.add(this.startGame,self);
        liftTween.start();
      }

    },

    // false: truck comes up WAY short
    // true: truck backs up and completely overshoots
    scene2: function (dirReverse) {
      self = this;
      this.truck.anchor.set(0, 1);

      if (dirReverse) {
        this.truck.x = this.game.width;
      } else {
        this.truck.x = 0 - this.truck.width;
      }

      this.truck.y = this.game.height * 0.65;
      this.lift.x = this.game.width * 0.65;
      this.lift.y = this.game.height * 0.65;
      this.wall1.y = this.game.height * 0.65;
      this.wall2.x = this.game.width * 0.835;
      this.wall2.y = this.game.height * 0.65;

      fwdAnim1();

      function fwdAnim1() {

        if (dirReverse) {
          duration = 4000;
        } else {
          duration = 2000;
        }

        fwdParams1 = {x: self.game.width * .15};
        fwdTween1 = game.add.tween(self.truck).to(fwdParams1, duration, Phaser.Easing.Linear.None);
        if (dirReverse) {
          self.truck.start_motion_reverse();
        } else {
          self.truck.start_motion();
        }
        fwdTween1.onComplete.add(stopAnim, self);
        fwdTween1.start();
      }

      function stopAnim() {
        self.truck.motorSound.stop();
        stopParams = {};
        stopTween = game.add.tween(self.truck).to(stopParams, 1000, Phaser.Easing.Linear.None);
        self.truck.stop_motion();
        stopTween.onStart.add(liftAnim, self);
        stopTween.start();
      }

      function liftAnim() {
        liftParams = {y: 0 - self.lift.height};
        liftTween = game.add.tween(self.lift).to(liftParams, 2000, Phaser.Easing.Linear.None);
        liftTween.onComplete.add(this.startGame,self);
        liftTween.start();
      }
    },

    // false: truck overshoots a bit, half/half
    // true: trucks backs up just short, half/half
    scene3: function (dirReverse) {
      self = this;
      this.truck.anchor.set(1);

      if (dirReverse) {
        startPos = this.game.width;
      } else {
        startPos = 0;
      }

      this.truck.x = startPos;
      this.truck.y = this.game.height * 0.65;
      this.lift.x = this.game.width * 0.35;
      this.lift.y = this.game.height * 0.65;
      this.wall1.x = this.game.width * -0.3;
      this.wall1.y = this.game.height * 0.65;
      this.wall2.x = this.game.width * 0.535;
      this.wall2.y = this.game.height * 0.65;
      this.dust.x = this.game.width * 0.65;
      this.dust.y = this.game.height * 0.55;

      fwdAnim();

      function fwdAnim() {
        fwdParams = {x: self.game.width * .65};
        fwdTween = game.add.tween(self.truck).to(fwdParams, 3000, Phaser.Easing.Linear.None);
        if (dirReverse) {
          self.truck.start_motion_reverse();
        } else {
          self.truck.start_motion();
        }
        fwdTween.onComplete.add(flipAnim, self);
        fwdTween.start();
      }

      function flipAnim() {
        flipParams = {angle: 80, x: self.truck.x - 60, y: self.truck.y + 20};
        flipTween = game.add.tween(self.truck).to(flipParams, 1000, Phaser.Easing.Bounce.Out);
        self.truck.stop_motion();
        flipTween.onStart.add(liftAnim, self);
        flipTween.onComplete.add(this.killTruck, self);
        flipTween.onComplete.add(this.poof, self);
        flipTween.start();
      }

      function liftAnim() {
        self.truck.motorSound.stop();
        liftParams = {y: 0 - self.lift.height};
        liftTween = game.add.tween(self.lift).to(liftParams, 2000, Phaser.Easing.Linear.None);
        liftTween.onComplete.add(this.startGame,self);
        liftTween.start();
      }
    },

    // false: truck completely overshoots
    // true: truck backs up very short
    scene4: function (dirReverse) {
      console.log(dirReverse);
      self = this;
      this.truck.anchor.set(0, 1);
      if (dirReverse) {
        startPos = this.game.width;
      } else {
        startPos = 0;
      }
      this.truck.x = startPos;
      this.truck.y = this.game.height * 0.65;
      this.lift.x = this.game.width * 0.35;
      this.lift.y = this.game.height * 0.65;
      this.wall1.x = this.game.width * -0.3;
      this.wall1.y = this.game.height * 0.65;
      this.wall2.x = this.game.width * 0.535;
      this.wall2.y = this.game.height * 0.65;

      fwdAnim();

      function fwdAnim() {
        fwdParams = {x: self.game.width};
        fwdTween = game.add.tween(self.truck).to(fwdParams, 3000, Phaser.Easing.Linear.None);
        if (dirReverse) {
          self.truck.start_motion_reverse();
        } else {
          self.truck.start_motion();
        }
        fwdTween.onComplete.add(liftAnim, self);
        fwdTween.start();
      }

      function liftAnim() {
        self.truck.motorSound.stop();
        self.truck.cautionBeep.stop();
        liftParams = {y: 0 - self.lift.height};
        liftTween = game.add.tween(self.lift).to(liftParams, 2000, Phaser.Easing.Linear.None);
        liftTween.onComplete.add(this.startGame, self);
        liftTween.start();
      }
    },

    startGame: function () {
     this.state.start('Game');
    },
    poof: function () {
      this.dust.start_poof();
    },

    killTruck: function() {
      this.truck.kill();
    },

    render: function () { // render boundary box
      // this.game.debug.spriteBounds(this.truck);
      // this.game.debug.spriteBounds(this.lift);
      // this.game.debug.spriteBounds(this.dust);
    }

};
