// Object Circle
class Rectangle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.sideSize = 20;
        this.color = color;
        this.history = [[x,y]]; 
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

    setPosition(x,y){
        this.x = x;
        this.y = y;
        this.history.push([x,y]);
    }

    setColor(color){
      this.color = color;
    }

    getHistoricalPosition(){
        return this.history;
    }
  }
