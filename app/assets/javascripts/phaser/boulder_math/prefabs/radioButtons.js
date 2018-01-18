var radioButtons = function(options,x,y) {
    var buttons = [];
    var buttonState;

    this.buttons = buttons;
    this.state = function() {
        active = buttons.filter(function(btn){
            return btn.state == true;
        });

        return active[0].text.text;
    }

    options.forEach(function(element,i){
        var button = game.add.checkbox(x,y + (i * 36), {text: element,style: {fill: '#ffffff', font: '18pt Arial'}},'radioBtn');
        buttons.push(button);
        button.events.onInputUp.add(function(elm,pointer){
            //set all other option states to false
            this.state = button.text.text;
            allOthers = buttons.filter(function(btn){
                return btn != button;
            });
            allOthers.forEach(function(element) {
                element.state = false;
            });
        },this);
    });

    this.setState = function(state) { 
        button = buttons.filter(function(btn){
            return btn.text.text == state;
        });

        button[0].state = true;
    }

};
