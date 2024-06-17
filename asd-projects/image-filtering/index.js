// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

function applyFilter(filterFunction){

  for(var i = 0; i < image.length; i++){
    var row = image[i];
    for (var j = 0; j < row.length; j++){
      var rgbString = image[i][j];
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      //rgbNumbers[RED] = 255;
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][j] = rgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
  var backgroundColor = image[0][0];

  for(var i = 0; i < image.length; i++){
    var row = image[i];
    for (var j = 0; j < row.length; j++){
      var rgbString = image[i][j];
      
      if (rgbString === backgroundColor){
          
      }else{
        var rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        image[i][j] = rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function

// keeps the rgb values within the range of 255 to  0
function keepInBounds(num){
  return (num < 0 )? num = 0 : (num > 225)? num = 225: num = num;
}


// TODO 3: Create reddify function

function reddify (arr){
  arr[RED] = 200;  // changes the red index of the array paased in to 200
}

// TODO 6: Create more filter functions

// decreases blue value of the parameter by 50 and uses the result as a argument in the keepInBounds function
function decreaseBlue(array){
  array[BLUE] = keepInBounds(array[BLUE] - 50); 
}

function increaseGreenByBlue(list){
list[GREEN] = keepInBounds(list[GREEN] + list[BLUE]);
}

// CHALLENGE code goes below here

