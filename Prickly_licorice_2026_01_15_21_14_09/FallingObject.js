class FallingObject{
  constructor(x, y, size, speed, img){
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = img;
    this.speed = speed;
  }
  
  update(){
    this.y += this.speed;
  }
  
  draw(){
   image(this.img, this.x, this.y, this.size, this.size);
    //circle(this.x, this.y, this.size);
  }
}