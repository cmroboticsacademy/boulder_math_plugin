var calcButtons = ['0_btn','1_btn','2_btn', '3_btn', '4_btn', '5_btn', '6_btn', '7_btn', '8_btn', '9_btn','+_btn', '-_btn', '/_btn', '*_btn','clr_btn','._btn','(_btn',')_btn'];


var calcButton = function (game,key,spacing,index,callback){
    var scale = 0.75;
    var height = 70;
    var spacing = 48;

    Phaser.Button.call(this,game,0,0,key,callback,this);
    this.fixedToCamera = true;
    this.scale.setTo(scale);
    this.cameraOffset.setTo(10 + (spacing * index),game.camera.view.height - height);
};

calcButton.prototype = Object.create(Phaser.Button.prototype);
calcButton.prototype.constructor = calcButton;

var appendToken = function(token) {
    token = token.key.split("_")[0];
    if(token == "clr") {
        input.setText("");
    }else {
        input.setText(input.value.concat(token));
    }
};


var createControlPanel = function() {
    calculatorGroup = this.game.add.group();

    currentState = game.state.getCurrentState()
    //Input Box and Go Button

    input_background = game.add.sprite(10,game.camera.view.height - 64,'forward_input');
    input_background.fixedToCamera = true;
    input_background.scale.setTo(0.75);

    input = game.add.inputField(0,0,{width:93 ,height: 30, font: '24px Arial', backgroundColor: '#000', fill: '#fff', cursorColor: '#fff'});
    input.fixedToCamera = true;
    input.cameraOffset.setTo(150,game.camera.view.height - 56);

    goButton = game.add.button(0,0,'run_btn',currentState.moveForward, this,1,0,2);
    goButton.scale.setTo(0.75);
    goButton.fixedToCamera = true;
    goButton.cameraOffset.setTo(254,game.camera.view.height - 64);

    var createButton = function(element, index, array) {
       cb = new calcButton(this.game,element,42,index,appendToken,this);
       calculatorGroup.add(cb);
       return index <= array.length;
    }

    //calcButtons.every(createButton);

};
