BoulderMath.WinScene = function () {};

BoulderMath.WinScene.prototype = {

    create: function () {

      backgroundGame = game.add.tileSprite(0,0,1600,3200,gameBackground);
      var style = { font: 'bold 40pt Arial', fill: 'white', align: 'left'};
      var style2 = { font: 'bold 24pt Arial', fill: 'white', align: 'left'};
      text = game.add.text(game.width/2, 100, "Congratulations!", style);
      score = game.add.text(game.width/2, 200, "Completed in " + attempts + " attempts with a difficulty setting of " + gameDifficulty, style2);
      text.anchor.setTo(0.5);
      score.anchor.setTo(0.5);

      //Award user_requirement
      host = window.location.hostname
      if (host == "dev.cs2n.org" || host == "localhost") {
          $.ajax({
            type: "POST",
            url: "/u/badges/55/award_requirement/926",
            data: {
              score: attempts + "/5" + " - " + gameDifficulty
            }
          });
      } else if (host == "staging.cs2n.org") {
          $.ajax({
            type: "POST",
            url: "/u/badges/28/award_requirement/339",
            data: {
              score: attempts + "/5" + " - " + gameDifficulty
            }
          });
      } else if (host == "cs2n.org" || "www.cs2n.org") {
          $.ajax({
            type: "POST",
            url: "/u/badges/58/award_requirement/981",
            data: {
              score: attempts + "/5" + " - " + gameDifficulty
            }
          });
      }



    },



    render: function () {
    }

};
