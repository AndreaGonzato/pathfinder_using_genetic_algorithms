class Rectangle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.sideSize = 20;
    this.color = color;
    this.isFrozen = false;
    this.history = [];
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


}
