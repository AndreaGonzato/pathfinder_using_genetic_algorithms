class Rectangle {
  static mapLength;
  static mapHeight;
  static xTarget;
  static yTarget;

  constructor(x, y, color, isAnExplorer) {
    this.x = x;
    this.y = y;
    this.sideSize = 20;
    this.color = color;
    this.isFrozen = false;
    this.history = [];
    this.geneticPoints = 0;
    this.isAnExplorer = isAnExplorer;
  }

  draw() {
    c.beginPath();
    c.rect(this.x, this.y, this.sideSize, this.sideSize);
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
    let xPoints = 100 - ((this.xTarget - this.x) * 100 / this.mapLength); // [0, 100]
    let yPoints = 100 - ((this.yTarget - this.y) * 100 / this.mapHeight); // [0, 100]
    let totalPoints = xPoints + yPoints;
    if(totalPoints > this.geneticPoints){
      this.geneticPoints = totalPoints;
      console.log(this.geneticPoint); // TEST
    }
  }


}

/*
//deteminate distance from 2 points
function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
*/