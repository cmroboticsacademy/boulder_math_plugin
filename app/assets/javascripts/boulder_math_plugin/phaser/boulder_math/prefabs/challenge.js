var wheel_size;
var pixel_scale = 8.0;
var challengePrompt;
var poly;
var graphics;



var challenge = function (startPos,endPos) {

    switch(gameDifficulty) {
      case 'Easy':
        wheel_size = 16;
        break;
      case 'Medium':
        wheel_size = 32;
        break;
      case 'Hard':
        console.log("It's hard");
        wheel_size = 24;
        break;
    }


    this.startPos = startPos;
    this.endPos = endPos;
    this.distance = Math.round((endPos[0] - startPos[0])) / pixel_scale;
    this.completed = false;
    this.distance < 0 ? this.direction = 0 : this.direction = 1;
    if (this.direction == 1) {
        this.text = "Your robot moves " + wheel_size + " feet forward per 1 wheel rotation.\n Target distance is " + this.distance + " feet away."
    } else {
        this.text = "Your robot moves " + wheel_size + " feet backwards per -1 wheel rotation.\n Target distance is " + this.distance + " feet away."
    }

    this.successSound = game.add.audio('correct');
    this.successSound.stop();
    this.failSound = game.add.audio('wrong');
    this.failSound.stop();

};


//Methods
challenge.prototype.checkCalculation = function(result) {
   var targetPos = this.endPos[0];
   var degree = targetPos - result;
   //Adjust threshold as needed!
   var thresholdLong = 116;
   var thresholdShort = 94;
   attempts++;
    if(result < targetPos && (degree <= thresholdShort)) {
        this.failSound.play("",0, 0.10);
        console.log("shortHalf",degree);
        return "shortHalf";
    }else if(result < targetPos && (degree > thresholdShort)) {
        this.failSound.play("",0, 0.10);
        console.log("short", degree);
        return "short";
    }else if(result > targetPos && (Math.abs(degree) <= thresholdLong)) {
        this.failSound.play("",0,0.10);
        console.log("longHalf",degree);
        return "longHalf";
    }else if(result > targetPos && (Math.abs(degree) > thresholdLong)) {
        this.failSound.play("",0,0.10);
        console.log("long", degree);
        return "long";
    }else if(result === targetPos) {
            score++;
        sd.incrementScore();
        this.successSound.play("",0,0.15);
        input.startFocus();

        if (score < 5) {
            currentChallenge.completed = true;
            currentChallenge = challenges.active();
            currentChallenge.displayPrompt();
            startOfChallenge = true;
            return "correct";
        } else {
            return "win";
        }
    };
};

challenge.prototype.displayPrompt = function() {
    var style = { font: 'bold 12pt Arial', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 550 };
    // var poly = new Phaser.Polygon([0, 0, game.width, 0, game.width, game.height, 0, game.height]);
    graphics = game.add.graphics(0, 0);
    poly = new Phaser.Polygon();
    poly.setTo([new Phaser.Point(game.width * 0.25, 0),
                new Phaser.Point(game.width * 0.75, 0),
                new Phaser.Point(game.width * 0.75, game.height * 0.085),
                new Phaser.Point(game.width * 0.25, game.height * 0.085)]);

    graphics.beginFill(0x000000, .5);
    graphics.drawPolygon(poly.points);
    graphics.endFill();
    graphics.fixedToCamera = true;

    challengePrompt = game.add.text(game.camera.width/2,30, this.text, style);
    challengePrompt.anchor.setTo(0.5);
    challengePrompt.fixedToCamera = true;
};

challenge.prototype.killPrompt = function () {
    challengePrompt.kill();
    graphics.kill();
};
