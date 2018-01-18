var PopupModal = function(game) {
    Phaser.Group.call(this,game);
};

PopupModal.prototype = Object.create(Phaser.Group.prototype);
PopupModal.prototype.constructor = PopupModal;
PopupModal.prototype.backgroundSprite = {};

PopupModal.prototype.show = function(type,msg) {

    var green = "#2ed341";
    var red = "#d13d19";
    var white = "#FFF";
    var tween = null;


    addModal = function(tag) {
        this.backgroundSprite = game.add.sprite(game.width / 2,100,tag);
        this.backgroundSprite.anchor.setTo(0.5);
        this.backgroundSprite.scale.setTo(1);
        this.backgroundSprite.alpha = 0.8;
        this.backgroundSprite.fixedToCamera = true;
        this.backgroundSprite.inputEnabled = true;
        return backgroundSprite;
    } 
    

    if(type == "complete") {
        modal = addModal("complete_modal");
        this.add(modal);
    }

    if(type == "blank") {
        modal = addModal("blank_modal");
        this.add(modal);
    }
    
};

PopupModal.prototype.hide = function () {
    this.text = {};
    this.children[0].kill();
};



