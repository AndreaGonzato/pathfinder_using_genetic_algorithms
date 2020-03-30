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
let numbersOfRectangles = 3;
var stage = 0; //use thi var for change stage
/*
0 main
0 position the target
1 position the starting point
*/

//deteminate distance from 2 points
function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

//event listener for click
document.addEventListener("click", function () {
  console.log("CLICK");
  stage++;
});


// define edge of action
const edge = {
  thickness: 3,
  leftMargin: 10,
  topMargin: 10,
  rightMargin: 1200,
  bottomMargin: 700
};

//frozes the rectangle if have a collision on the border
function borderCollision(rectangle, color) {

  if (rectangle.x < edge.leftMargin
    || rectangle.y < edge.topMargin
    || rectangle.x + 10 > edge.rightMargin
    || rectangle.y + 10 > edge.bottomMargin) {
    rectangle.setColor('black');
    rectangle.setIsFrozen(true);
  }
  else {
    rectangle.setColor(color);
  }


}

function main() {
  unloadScrollBars();
  rectangle[0] = new Rectangle(undefined, undefined, 'red');
  positionTheTarget();



}


function positionTheTarget() {
  drawEnvironment();
  rectangle[0].setPosition(Math.floor(mouse.x / 10) * 10, Math.floor(mouse.y / 10) * 10);
  borderCollision(rectangle[0], 'red');
  rectangle[0].update();
  if (stage == 1) {
    document.getElementById("p1").innerHTML = "now position the starting point";
    console.log("target position: ", rectangle[0].x, rectangle[0].y);
    rectangle[1] = new Rectangle(undefined, undefined, 'blue');
    positionTheStartingPoint();
  } else {
    requestAnimationFrame(positionTheTarget); //loop agin in the animate function
  }
}

function positionTheStartingPoint() {
  drawEnvironment();
  rectangle[1].setPosition(Math.floor(mouse.x / 10) * 10, Math.floor(mouse.y / 10) * 10);
  borderCollision(rectangle[1], 'blue');
  rectangle[1].update();
  rectangle[0].update();
  if (stage == 2) {
    document.getElementById("p1").innerHTML = "good";
    console.log("starting point position: ", rectangle[1].x, rectangle[1].y);
    initializesExplorers();
  } else {
    requestAnimationFrame(positionTheStartingPoint); //loop agin in the animate function
  }
}

function initializesExplorers() {
  rectangle[2] = new Rectangle(400, 200, 'green');
  explore();
}


// Animation Loop
function explore() {

  //clear caanvas and drow rect
  drawEnvironment();

  //update and drow rectangle[0]
  rectangle[0].update();
  rectangle[1].update();

  //update and drow rectangle
  rectangle[2].setPosition(Math.floor(mouse.x / 10) * 10, Math.floor(mouse.y / 10) * 10);
  rectangle[2].update();


  //determinate contact to target

  //determinate contact to edge
  for (i = 2; i < numbersOfRectangles; i++) {
    borderCollision(rectangle[i], "green");
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


