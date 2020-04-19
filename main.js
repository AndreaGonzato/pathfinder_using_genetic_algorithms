let canvas = document.getElementById("myCanvas");
let c = canvas.getContext("2d");

//define the canvas space
canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: undefined,
  y: undefined
}

// remove scoll bars from the page
function unloadScrollBars() {
  document.documentElement.style.overflow = 'hidden';  // firefox, chrome
  document.body.scroll = "no"; // ie only
}

// Event Listeners, update mouse pos when it moves
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})


//-----------------------------------------------------------------------------------------------
let rectangle = [];
let NUMBERS_OF_RETANGLES = 12;
let SPEED_RATE = 500;
var stage = 0; //use thi var for change stage
/*
0 main
0 position the target
1 position the starting point
*/


//event listener for click
document.addEventListener("click", function () {
  console.log("CLICK");
  stage++;
});


// define space of action
const edge = {
  thickness: 3,
  leftMargin: 10,
  topMargin: 10,
  rightMargin: 1210,
  bottomMargin: 710
};

var movingSpeedRate;

/**
 * froze rectangle if the are out of the space action
 * freezes = true -> froze and change the color of the rect
 * freezes = false -> just change the color of the rect
 * @param {a obj of rectangle} rectangle 
 * @param {type of color} color 
 * @param {boolean} freezes : indicate if we really need to froze
 */
function borderCollision(rectangle, color, freezes) {
  if (rectangle.x < edge.leftMargin
    || rectangle.y < edge.topMargin
    || rectangle.x + 10 > edge.rightMargin
    || rectangle.y + 10 > edge.bottomMargin) {
    rectangle.setColor('black');
    if(freezes && !rectangle.isFrozen){
      rectangle.setIsFrozen(true);
    }
  }
  else {
    rectangle.setColor(color);
  }
}

function main() {
  setRetangleMapFields();

  unloadScrollBars();
  rectangle[0] = new Rectangle(undefined, undefined, 'red', false);
  positionTheTarget();
}

function setRetangleMapFields(){
  Rectangle.xMinRectanglePosition = edge.leftMargin;
  Rectangle.xMaxRectanglePosition = edge.leftMargin + edge.rightMargin - Rectangle.sideSize;
  Rectangle.yMinRectanglePosition = edge.topMargin;
  Rectangle.yMaxRectanglePosition = edge.topMargin + edge.bottomMargin - Rectangle.sideSize;
  Rectangle.maxDistance = getDistance(Rectangle.xMaxRectanglePosition, Rectangle.yMaxRectanglePosition, Rectangle.xMinRectanglePosition, Rectangle.yMinRectanglePosition);
}

//deteminate distance from 2 points
function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}



function positionTheTarget() {
  drawEnvironment();
  rectangle[0].setPosition(Math.floor(mouse.x / 10) * 10, Math.floor(mouse.y / 10) * 10);
  borderCollision(rectangle[0], 'red', false);
  rectangle[0].update();
  if (stage == 1) {
    document.getElementById("p1").innerHTML = "now position the starting point";
    console.log("target position: ", rectangle[0].x, rectangle[0].y);
    // set some static variable of Rectangle
    Rectangle.xTarget = rectangle[0].x; 
    Rectangle.yTarget = rectangle[0].y
    rectangle[1] = new Rectangle(undefined, undefined, 'blue', false);
    positionTheStartingPoint();
  } else {
    requestAnimationFrame(positionTheTarget); //loop agin in the animate function
  }
}

function positionTheStartingPoint() {
  drawEnvironment();
  rectangle[1].setPosition(Math.floor(mouse.x / 10) * 10, Math.floor(mouse.y / 10) * 10);
  borderCollision(rectangle[1], 'blue', false);
  rectangle[1].update();
  rectangle[0].update();
  if (stage == 2) {
    document.getElementById("p1").innerHTML = "It is time to explore!";
    console.log("starting point position: ", rectangle[1].x, rectangle[1].y);
    initializesExplorers();
  } else {
    requestAnimationFrame(positionTheStartingPoint); //loop agin in the animate function
  }
}

function initializesExplorers() {
  console.log(Rectangle.xTarget)
  for(i = 2 ; i<NUMBERS_OF_RETANGLES ; i++){
    rectangle[i] = new Rectangle(rectangle[1].x, rectangle[1].y, 'green', true);
  }
  movingSpeedRate = setInterval(moveExplorers, SPEED_RATE); // set explorer speed as 1 move evry SPEED_RATE millisecods
  explore();
}

function moveExplorers() {
  for(i=2 ; i<NUMBERS_OF_RETANGLES ; i++){
    if (!rectangle[i].isFrozen) {
      let xDelta = 0;
      let yDelta = 0;

      if(Math.random() < 0.5){
        //move orizontaly
        if(Math.random() < 0.5){
          xDelta = -5;
        }else{
          xDelta = +5;
        }

      }else{
        //move verticaly
        if(Math.random() < 0.5){
          yDelta = -5;
        }else{
          yDelta = 5;
        }
      }

      rectangle[i].setPosition(rectangle[i].x + xDelta,rectangle[i].y + yDelta);
    }
  }
}

function stopMoveExplorers() {
  clearInterval(myVar);
}


function explore() {
  //clear caanvas and drow rect
  drawEnvironment();
  //update and drow rectangle 0 & 1
  rectangle[0].update();
  rectangle[1].update();

  //update and drow explorer
  for(i = 2; i<NUMBERS_OF_RETANGLES ; i++){
    rectangle[i].update();
  }


  //determinate contact to target

  //determinate contact to edge
  for (i = 2; i < NUMBERS_OF_RETANGLES; i++) {
    borderCollision(rectangle[i], "green", true);
  }




  requestAnimationFrame(explore); //loop agin in the animate function
}

function drawEnvironment() {
  //cleare canvas
  c.clearRect(0, 0, canvas.width, canvas.height);
  //drow big rect
  c.beginPath();
  c.lineWidth = edge.thickness;
  c.strokeStyle = "red";
  c.rect(edge.leftMargin, edge.topMargin, edge.rightMargin, edge.bottomMargin);
  c.stroke();
  c.closePath();
}

//starter
main()


