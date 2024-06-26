/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  
  // Week 1: Store data
  var playerOneScore = 0;
  var playerTwoScore = 0;
  
  // magic keys 
  var KEYS = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
  }

  // Game Item factory function 
  function item (id){
    var obj = {};
    
    obj.id = id;
    obj.x = parseFloat($(id).css("left"));  // may need to change this to a parameter
    obj.y = parseFloat($(id).css("top"));  // may need to change this to a parameter
    obj.speedX = 0;
    obj.speedY = 0;
    obj.width = $(id).width();
    obj.height = $(id).height();

    return obj;
  }

    // Game Item Objects
    var ball = item("#ball");
    var rightPaddle = item("#rightPaddle");
    var leftPaddle =  item("#leftPaddle");

  
    // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUP);
  startBall();
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(ball);
    moveObject(rightPaddle);
    moveObject(leftPaddle);

    wallCollision(ball);
    wallCollision(rightPaddle);
    wallCollision(leftPaddle);

    // bounces the ball off of the paddle 
    if (doCollide(ball, rightPaddle)){
      ball.x *= ball.speedX;
      ball.y *= ball.speedY;
    }else if (doCollide(ball, leftPaddle)){
      ball.x *= ball.speedX;
      ball.y *= ball.speedY;
    }
  }
  
  /* 
  Called in response to events.
  */
  // called when the w key or up arrow are pressed
  // DOWN Key is Right Paddle 
  function handleKeyDown(event){
    var keyCode = event.which;

    if (keyCode === KEYS.DOWN){
      rightPaddle.speedY = 5;
      //console.log("down arrow pressed");
    }else if (keyCode === KEYS.S){
      leftPaddle.speedY = 5;
      //console.log("S pressed");
    }
  }
  
  // called when the s key or down arrow are pressed
  function handleKeyUP(event){
    var keyCode = event.which;

    if (keyCode === KEYS.UP){
      rightPaddle.speedY = -5;
      //console.log("up arrow pressed");
    }else if (keyCode === KEYS.W){
      leftPaddle.speedY = -5;
      //console.log("W pressed");
    }
  }

  
  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //moves the ball at a random speed and sets the ball in the middle
  function startBall(){
    ball.x = 215;
    ball.y = 215;

    var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedX = randomNum;
    ball.speedY = randomNum;
  }
  
  //repositions all objects 
  function moveObject (gameItem){
    gameItem.x += gameItem.speedX;
    gameItem.y += gameItem.speedY;
    $(gameItem.id).css("left", gameItem.x);
    $(gameItem.id).css("top", gameItem.y);

  }

  //stops game item from going passed the game board
  function wallCollision (gameItem){
    if (gameItem.x <= 0){
      gameItem.x = 0;
      gameItem.x *= gameItem.speedX;
      gameItem.y *= gameItem.speedY;
    
    }else if(gameItem.y <= 0 ){
      gameItem.y = 0;
      gameItem.x *= gameItem.speedX;
      gameItem.y *= gameItem.speedY;
    
    
    }else if ((gameItem.x + gameItem.width) > BOARD_WIDTH){
      gameItem.x = BOARD_WIDTH - gameItem.width;
      gameItem.x *= gameItem.speedX;
      gameItem.y *= gameItem.speedY;
    
    
    }else if ((gameItem.y + gameItem.height) > BOARD_HEIGHT){
      gameItem.y = BOARD_HEIGHT - gameItem.height;
      gameItem.x *= gameItem.speedX;
      gameItem.y *= gameItem.speedY;
    
    }

    // checks if a player scores and updates it
    if (ball.x === 0){
      playerOneScore++;
      $("#score1").text("Player 1: " + playerOneScore);
      startBall();
        if (playerOneScore === 11){
          endGame();
        }
    }else if (ball.x === (BOARD_WIDTH - ball.width)){
      playerTwoScore++;
      $("#score2").text("Player 2: " + playerTwoScore);
      startBall();
         if (playerTwoScore === 11){
          endGame();
         }
    }

    
  }

  //checks if the game items collide
  function doCollide(obj1, obj2){
    if (obj1.x < (obj2.x + obj2.width) && (obj1.x + obj1.width) > obj2.x && obj1.y < (obj2.y + obj2.height) && (obj1.y + obj1.height)> obj2.y){ 
      return true;
    } else {
      return false;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
