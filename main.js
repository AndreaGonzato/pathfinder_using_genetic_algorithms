let canvas = document.getElementById("myCanvas");
let c = canvas.getContext("2d");

//define the canvas space
canvas.width = innerWidth
canvas.height = innerHeight


const mouse = {
  x: undefined,
  y: undefined
}

// Event Listeners, update mouse pos when it moves
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

// Event Listeners, update canvas size after a resize
addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  main()
})


//-----------------------------------------------------------------------------------------------

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


// IMPLEMENTATION
const edge = {
  thickness: 3,
  leftMargin: 10,
  topMargin: 10,
  rightMargin: 30,
  bottomMargin: 25
};

const circleRadius = 20;
var stage = 0; //use thi var for change stage
/*
0 main
1 positionTheTarget
2 explore
*/

let circle = [];

//determiante if a circle has a collision with the border
function borderCollision() {
  //true = collision
  //false = ok
  if (circle[1].x < edge.leftMargin + circle[1].radius + edge.thickness) {
    return true;
  }
  if (circle[1].x > canvas.width - edge.rightMargin - circle[1].radius + 2 * edge.thickness) {
    return true;
  }
  if (circle[1].y < edge.topMargin + circle[1].radius + edge.thickness) {
    return true;
  }
  if (circle[1].y > canvas.height - edge.bottomMargin - circle[1].radius + 2 * edge.thickness) {
    return true;
  }
  return false;

}

function main() {
  document.getElementById("p1").innerHTML = "Click on the screen to position the target";
  circle[0] = new Circle(undefined, undefined, circleRadius, 'red');
  positionTheTarget();
}


function positionTheTarget() {
  drawEnvironment();
  circle[0].setPosition(mouse.x, mouse.y);
  circle[0].update();
  if (stage == 1) {
    console.log("target position: ", circle[0].x, circle[0].y);
    initializesExplorers();
  } else {
    requestAnimationFrame(positionTheTarget); //loop agin in the animate function
  }
}

function initializesExplorers() {
  circle[1] = new Circle(400, 200, circleRadius, 'black');
  circle[2] = new Circle(500, 300, circleRadius, 'black');
  explore();
}


// Animation Loop
function explore() {

  //clear caanvas and drow rect
  drawEnvironment();

  //update and drow circle0
  circle[0].update();

  //update and drow circle2
  circle[1].setPosition(200, 300);
  circle[1].update();
  circle[1].setPosition(300, 400);
  circle[2].update();


  //determinate contact to target
  if (getDistance(circle[0].x, circle[0].y, circle[1].x, circle[1].y) < circle[0].radius + circle[1].radius) {
    circle[0].color = 'black';
  } else {
    circle[0].color = 'red';
  }

  //determinate contact to edge
  if (borderCollision()) {
    circle[1].color = 'green';
  } else {
    circle[1].color = 'black';
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
  c.rect(edge.leftMargin, edge.topMargin, canvas.width - edge.rightMargin, canvas.height - edge.bottomMargin);
  c.stroke();
  c.closePath();
}

//starter
main()


