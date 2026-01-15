class Basket{
  constructor(x, y, size, img){
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = img;
    this.speed = 5;
  }

    move(direction) {
    if (direction == "left") {
      this.x -= this.speed;
    }
    if (direction == "right") {
      this.x += this.speed;
    }
  }

  
  update(){
    
  }
  
  draw(){
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size, this.size); // zobrazení
  }
}