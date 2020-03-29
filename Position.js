class Position {
    constructor(x,y) {
      this.x = x;
      this.y = y;
      this.history = [[x,y]]; 
    }

    currentPosition(){
        return this.history[this.history.length-1];
    }

    addPosition(x,y){
        this.history.push([x,y]);
    }

}