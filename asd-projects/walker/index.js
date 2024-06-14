/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // magic numbers 
  const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };
  
  // Game Item Objects
  //monitors and controls x and y location and x and y speed
  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
  };


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                            // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }
  
  /* 
  Called in response to when an arrow key is presseed.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN){
      console.log("down pressed");
      walker.speedY = 5;
    }else if (event.which === KEY.UP){
      console.log("up pressed");
      walker.speedY = -5;
    }else if (event.which === KEY.LEFT){
      console.log("left pressed");
      walker.speedX = -5;
    }else if(event.which === KEY.RIGHT){
      console.log("right pressed");
      walker.speedX = 5;
    }
  }

  //called in response to when a arrow key is released
  function handleKeyUp(event) {
    if (event.which === KEY.DOWN){
      walker.speedY = 0;
    }else if (event.which === KEY.UP){
      walker.speedY = 0;
    }else if (event.which === KEY.LEFT){
      walker.speedX = 0;
    }else if(event.which === KEY.RIGHT){
      walker.speedX = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    walker.x += walker.speedX; // updates position along the x axis
    walker.y += walker.speedY; // updates position along the y axis
  }

  function redrawGameItem(){
    $("#walker").css("top", walker.y).css("left", walker.x); // draws the walker in a new location y pixels away from the top and x pixels away from the left
  }
  
  function wallCollision(){
    var rightWall = $("#board").width(); //finds the width of the board element and assigns it to the var
    var bottomWall = $("#board").height(); //finds the height of the board element and assigns it to the var
    
    if (walker.x >= rightWall){  
      walker.x -= walker.speedX;
    }else if(walker.y >= bottomWall){
      walker.y -= walker.speedY;
    }else if(walker.x <= 0){
      walker.x -= walker.speedX;
    }else if(walker.y <= 0){
      walker.y -= walker.speedY;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
