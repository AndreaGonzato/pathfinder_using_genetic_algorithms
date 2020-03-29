// Object Circle
class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.history = [[x,y]]; 
        this.radius = radius
        this.color = color
    }
  
    draw() {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
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

    getHistoricalPosition(){
        return this.history;
    }
  }
