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

  init()
})


//-----------------------------------------------------------------------------------------------

//deteminate distance from 2 points
function getDistance(x1, y1, x2, y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}



// IMPLEMENTATION
const edge = {
  thickness : 3,
  leftMargin : 10,
  topMargin : 10,
  rightMargin : 30,
  bottomMargin : 25
};

const circleRadius = 20;

let circle = [];

//determiante if a circle has a collision with the border
function borderCollision(){
  //true = collision
  //false = ok
  if(circle[1].x < edge.leftMargin + circle[1].radius + edge.thickness){
    return true;
  }
  if(circle[1].x > canvas.width - edge.rightMargin - circle[1].radius + 2*edge.thickness){
    return true;
  }
  if(circle[1].y < edge.topMargin + circle[1].radius + edge.thickness){
    return true;
  }
  if(circle[1].y > canvas.height - edge.bottomMargin - circle[1].radius + 2*edge.thickness){
    return true;
  }
  return false;

}

function init() {
  circle[0] = new Circle(700, 300, circleRadius, 'red');
  circle[1] = new Circle(undefined, undefined, circleRadius, 'black');
  circle[2] = new Circle(500, 300, circleRadius, 'black');
}

let tester = 0;
// Animation Loop
function animate() {
  if(tester % 1000 == 0){
    //console.log(circle[1].getHistoricalPosition());
  }
  tester++;

  requestAnimationFrame(animate)

  //cleare canvas
  c.clearRect(0, 0, canvas.width, canvas.height)

  //drow big rect
  c.beginPath();
  c.lineWidth = edge.thickness;
  c.strokeStyle = "red";
  c.rect(edge.leftMargin, edge.topMargin,  canvas.width-edge.rightMargin, canvas.height-edge.bottomMargin);
  c.stroke();
  c.closePath();


  //update and drow circle1
  circle[0].update();

  //update and drow circle2
  circle[1].setPosition(mouse.x, mouse.y);
  circle[1].update();
  circle[2].update();

  //determinate contact to target
  if(getDistance(circle[0].x, circle[0].y, circle[1].x, circle[1].y) < circle[0].radius +circle[1].radius){
      circle[0].color = 'black';
  } else {
      circle[0].color = 'red';
  }

  //determinate contact to edge
  if(borderCollision()){
    circle[1].color = 'green';
  }else{
    circle[1].color = 'black';
  }

}

//starter
init()
animate()


//implementa check su cerchio rosso, deve stare dentro i margini...