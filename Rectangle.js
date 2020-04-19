class Rectangle {
  // Retangle Map Fields
  static xMinRectanglePosition; // 10
  static xMaxRectanglePosition; // 1200
  static yMinRectanglePosition; // 10
  static yMaxRectanglePosition; // 700

  static maxDistance; // 1375

  static xTarget;
  static yTarget;

  static sideSize = 20;

  constructor(x, y, color, isAnExplorer) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.isFrozen = false;
    this.history = [];
    this.geneticPoints = 0;
    this.isAnExplorer = isAnExplorer;
  }

  draw() {
    c.beginPath();
    c.rect(this.x, this.y, Rectangle.sideSize, Rectangle.sideSize);
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }

  setPosition(x, y) {
    if(this.x != x || this.y != y){
      let movement = '';
      if (!this.isFrozen) {
        if (this.x != x) {
          if (x > this.x) {
            movement = 'R';
          }else{
            movement = 'L';
          }
          this.history.push(movement);
        }
        if(this.y != y){
          if(y > this.y){
            movement = 'D';
          }else{
            movement = 'U';
          }
          this.history.push(movement);
        }
        this.x = x;
        this.y = y;
      }
    }
    if(this.isAnExplorer){
      this.updateGeneticPoints();
    }
  }

  setColor(color) {
    this.color = color;
  }

  setIsFrozen(bool) {
    this.isFrozen = bool;
  }

  getHistory(){
    return this.history;
  }

  
  updateGeneticPoints(){
    let distance = getDistance(this.x , this.y, Rectangle.xTarget, Rectangle.yTarget);
    let poits = (Rectangle.maxDistance - distance) / Rectangle.maxDistance * 100;

    if(poits > this.geneticPoints){
      this.geneticPoints = poits;
    }
    
  }


}


//deteminate distance from 2 points
function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
