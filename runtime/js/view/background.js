var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
      var tree;
      var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#015482');
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield **
            
            var moon = draw.bitmap("img/starfish.png");
            moon.x = 300;
            moon.y = 200;
            moon.scaleX = 10.0;
            moon.scaleY = 10.0;
            background.addChild(moon);
            
            // bubbles all over the screen **
            
            for (var i = 0; i < 100; i++){
                var bubble = draw.bitmap("img/bubbles.png");
                bubble.x = canvasWidth * Math.random;
                bubble.y = groundY * Math.random;
                bubble.scaleX = .002;
                bubble.scaleY = .002;
                background.addChild(bubble);
            }
            

            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
           for (var i = 0; i < 9; i++) {
                var buildingHeight = 230;
                var building = draw.bitmap("img/Runtime_Obs2.webp");
                building.x = 220 * i;
                building.y = groundY - buildingHeight;
                building.scaleX = .123;
                building.scaleY = .123;
                background.addChild(building);
                buildings.push(building);
              }
            
            // TODO 3: Part 1 - Add a tree
            
            function addTree(x, y){
            tree = draw.bitmap("img/fish2.webp"); 
            tree.x = x;
            tree.y = y;
            tree.scaleX = .3;
            tree.scaleY= .3;
            background.addChild(tree);
            }
            addTree (10,100);

        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x--;
            if(tree.x < -400){
                tree.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax
            
            for (var i = 0; i < buildings.length; i++) {
                var eachElement = buildings[i];
                eachElement.x -= 0.5; 
                if (eachElement.x < -400){
                    eachElement.x = canvasWidth;
                }
              }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
