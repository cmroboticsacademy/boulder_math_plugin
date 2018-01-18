var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'container');
var score = 0;

//game options
var gameDifficulty = "Easy";
var music = true;
var sound = true;
var gameResult;
var gameBackground = "Daytime";


game.state.add('Boot', BoulderMath.Boot);
game.state.add('Preloader', BoulderMath.Preload);
game.state.add('MainMenu', BoulderMath.MainMenu);
game.state.add('Game', BoulderMath.Game);
game.state.add('LoseScene', BoulderMath.LoseScene);
game.state.add('WinScene', BoulderMath.WinScene);
game.state.add('Settings', BoulderMath.Settings);

game.state.start('Boot');
