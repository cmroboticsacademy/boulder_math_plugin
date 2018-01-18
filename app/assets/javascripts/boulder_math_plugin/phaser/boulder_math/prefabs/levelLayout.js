/////////////////////////////////////////////////////
//Level Layout and LevelLayout.gameChallenges Object
//Prototypes
////////////////////////////////////////////////////

var levelLayout = function() {};
var lifts = {};
var randomChoices = [];
var challenges;

levelLayout.prototype.challenge_positions = [];
levelLayout.prototype.lift_positions = [];
levelLayout.prototype.currentLift = {};

//methods
levelLayout.prototype.createTileMap = function(key,colision_cells) {
    map = game.add.tilemap(key);
    map.addTilesetImage('BoulderMath_TileSheet', 'tiles');
    layer = map.createLayer(0);
    layer_overlay = map.createLayer(1);
    map.setCollision(colision_cells, true,0);
    layer.resizeWorld();
    layer_overlay.resizeWorld();
};
levelLayout.prototype.makeLifts = function(params) {
    lifts.add(new Lift(game, params[0], params[1], params[2]));
    return true;
};
levelLayout.prototype.createLifts = function() {
    lifts = game.add.group();
    this.lift_positions.every(this.makeLifts);
    this.currentLift = lifts.getFirstAlive();
};
levelLayout.prototype.makeChallenges = function(challenge_array) {
    layout.challenge_positions = challenge_array;
    challenges = new levelLayout.gameChallenges;
    challenges.collection = [];
    layout.challenge_positions.forEach(function(element,index){
       c = new challenge(element[0],element[1]);
       challenges.addChallenge(c);
    });
    currentChallenge = challenges.active();
};

//gameChallenges Object
levelLayout.gameChallenges = function () {};
levelLayout.gameChallenges.prototype =  {
    collection: [],
    addChallenge: function (challenge) {
        this.collection.push(challenge);
    },
    active: function () {
        function isCompleted(element) {
            if (element.completed == false) {
                return element;
            }
        };
        return this.collection.find(isCompleted);
    },
    activeIndex: function () {
        function isCompleted(element) {
            if (element.completed == false)
                return element;
        };
        return this.collection.findIndex(isCompleted);
    }
};

///////////////////////////////////////////////////////
// Layout Configurations
// N Number of Layout Configurations can be 
// randomized without repeats
//////////////////////////////////////////////////////

var createLayout1 = function() {
    layout = new levelLayout;
    layout.lift_positions = [[128,2752,2176],[512,2752],[1024, 2752],[704,2176],[1152,2176,1728],[896,1728,1088],[192,1088],[1408,1088,128]];
    layout.createLifts();
    layout.createTileMap('boulder_math1',[12,15]);
    layout.makeChallenges([[[0,2656],[128,2752]],[[256,2080],[1152,2176]],[[1056,1632],[896,1728]],[[1024,992],[1408,1088]],[[1312,32],[8,128]]]);
   };

var createLayout2 = function() {
    layout = new levelLayout;
    layout.lift_positions = [[128,2752,2176],[512,2752],[1024, 2752],[570,2176],[896,2176,1088],[448,1088,576],[704,578,128]]
    layout.createLifts();
    layout.createTileMap('boulder_math2',[12,15]);
    layout.makeChallenges([[[0,2656],[128,2752]],[[256,2080],[896,2176]],[[800,992],[448,1088]],[[576,480],[704,576]],[[608,34],[8,128]]]);
};

var createLayout3 = function() {
    layout = new levelLayout;
    layout.lift_positions = [[128,2752,2176],[896,2752],[1472, 2752],[576,2176],[1088,2176,1728],[448,1728,1088],[1152,1088,576],[576,576,126]];
    layout.createLifts();
    layout.createTileMap('boulder_math3',[12,15]);
    layout.makeChallenges([[[0,2664],[128,2752]],[[256,2080],[1088,2176]],[[992,1632],[448,1728]],[[576,991],[1152,1088]],[[1056,480],[576,576]]]);
};

var createLayout4 = function() {
    layout = new levelLayout;
    layout.lift_positions = [[128,2752,2176],[896,2752],[448,2176],[896,2176],[1472,2176,1728],[896,1728,1088],[1152,1088],[448,1088,576],[0,576,128],[576,128]];
    layout.createLifts();
    layout.createTileMap('boulder_math4',[12,15]);
    layout.makeChallenges([[[0,2656],[128,2752]],[[256,2080],[1472,2176]],[[1376,1632],[896,1728]],[[800,992],[448,1088]],[[320,480],[0,576]]]);
};


var createLayout5 = function() {
    layout = new levelLayout;
    layout.lift_positions = [[128,2752,2176],[512,2752],[1024,2752],[1152,2176,1728],[640,1728,1088],[1280,1088,128],[192,1088]];
    layout.createLifts();
    layout.createTileMap('boulder_math5',[12,15]);
    layout.makeChallenges([[[0,2656],[128,2752]],[[256,2080],[1152,2176]],[[1280,1632],[640,1728]],[[768,992],[1280,1088]],[[1184,32],[192,128]]]);

};


var randomizeLayout = function() {
    layoutArray = ['createLayout1', 'createLayout2', 'createLayout3', 'createLayout4', 'createLayout5'];
    choice = layoutArray[getRandomArbitrary(0,4)];
    while (randomChoices.includes(choice) && randomChoices.length != 5) {
        choice = layoutArray[getRandomArbitrary(0,4)];
    };
    logChoices(choice);
    return window[choice]();

    function getRandomArbitrary(min,max) {
        return Math.round((Math.random() * (max - min) + min));
    };

    function logChoices(choice) {
        if (randomChoices.length == 5) {
            randomChoices = [];
        } else {
            randomChoices.push(choice);
        }
    };

};


