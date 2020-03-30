class Rectangle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.sideSize = 20;
    this.color = color;
    this.isFrozen = false;
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
    if (!this.isFrozen) {
      this.x = x;
      this.y = y;
    }
  }

  setColor(color) {
    this.color = color;
  }

  setIsFrozen(bool) {
    this.isFrozen = bool;
  }


}
