var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE

  // creates sawblades
    function createSawblades(x,y){
    var hitZoneSize = 25;
    var damageFromObstacle = 10;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;
    game.addGameItem(sawBladeHitZone);
    var obstacleImage = draw.bitmap("img/shell..webp");
    sawBladeHitZone.addChild(obstacleImage);
    obstacleImage.x = -33;
    obstacleImage.y = -33;
    obstacleImage.scaleX = .065;
    obstacleImage.scaleY = .065;
    }
   
    
    //todo 9

    function createEnemy (x, y) {
    // todo 7 creates enemey
    var enemy = game.createGameItem("enemy", 25);
    var jellyFish = draw.bitmap("img/enemy.png");
    jellyFish.x =- 40;
    jellyFish.y =- 80;
    jellyFish.scaleX= .15;
    jellyFish.scaleY= .15;
    enemy.addChild(jellyFish);
    enemy.x = x;
    enemy.y = y;
    game.addGameItem(enemy); 

    // todo 8
    enemy.velocityX = -2;
    enemy.velocityY = 0;
    enemy.rotationalVelocity = 0;

    enemy.onPlayerCollision = function () {
      game.changeIntegrity(-10);
    }

    enemy.onProjectileCollision = function () {
      game.increaseScore(200);
      enemy.fadeOut();
    }
  }

 

  // todo 10 - reward

  function createReward (x,y) {
     
     var reward = game.createGameItem("chest", 25);
     var chest = draw.bitmap("img/chest.webp");
     chest.x =- 60;
     chest.y =- 60;
     chest.scaleX= .1;
     chest.scaleY = .1;
     reward.addChild(chest);
     reward.x = x;
     reward.y = y;
     game.addGameItem(reward); 
 
     reward.velocityX = -2;
     reward.velocityY = 0;
     reward.rotationalVelocity = 0;
 
     reward.onPlayerCollision = function () {
       game.changeIntegrity(20);
     }
 
     reward.onProjectileCollision = function () {
       game.increaseScore(1200);
       reward.fadeOut();
     }
  }
   
  // todo 11 - end level marker

  function createMarker (x,y) {
     
    var marker = game.createGameItem("flag", 25);
    var flag = draw.bitmap("img/flag.png");
    flag.x =- 30;
    flag.y =- 30;
    flag.scaleX= .1;
    flag.scaleY= .1;
    marker.addChild(flag);
    marker.x = x;
    marker.y = y;
    game.addGameItem(marker); 

    marker.velocityX = -2;
    marker.velocityY = 0;
    marker.rotationalVelocity = 0;

    marker.onPlayerCollision = function () {
     marker.startLevel();
    }

    marker.onProjectileCollision = function () {
      game.increaseScore(1200);
      marker.startLevel();
    }
 }

 

    function startLevel() {
      // TODO 13 goes below here
        var level = levelData[currentLevel];
        var levelObject = level.gameItems;
        
        for (var i = 0; i < levelObjects.length; i++){
            var current = levelObjects[i];
            if (current.type === "sawblade"){
              createSawblade(current.x, current.y);
            } else if (current.type === "enemy"){
              createEnemy(current.x, current.y);
            }else if (current.type === "reward"){
              createReward(current.x, current.y);
            }else if (current.typw === "marker"){
              createMarker(current.x, current.y);
            }
        }


      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
