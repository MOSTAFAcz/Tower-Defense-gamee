let objects = [];

let apple;
let basket;

let keys = {};

let score;

function preload() {
  apple = loadImage('./images/Apple.png');
  basket = loadImage('/images/Basket.png');
  menu = loadImage('/images/menu1.png');
  bg = loadImage('/images/BG.png');
}

function setup() {
  createCanvas(400, 400);
  basket = new Basket(width/2, 360, 50, basket);
  score = 0;
}

function update(){
  let x = random(30, width-30);
  let y = random(-100, -20);
  let size = random(10, 30);
  if(frameCount % 10 === 0 && random(1) > 0.5){
    objects.push(new FallingObject( x, y, size, 2, apple))
  }
  
  for (let i = objects.length - 1; i >= 0; i--) {
    let c = objects[i];
    
    let half = basket.size / 2;
    let closestX = constrain(c.x, basket.x - half, basket.x + half);
    let closestY = constrain(c.y, basket.y - half, basket.y + half);
    
    let dx = c.x - closestX;
    let dy = c.y - closestY; // jak daleko jsou od sebe body 
    
    let r = c.size / 2; // poloměr jablka
    
    if (dx*dx + dy*dy < r*r){
      console.log("KOLIZE");
      objects.splice(i, 1);
      score++;
    }
  }
}


function draw() {
  imageMode(CORNER);
  image(bg, 0, 0, 400, 400);
  imageMode(CENTER);
  image(menu, -5, -5, 176, 70);
  textFont('Baloo');
  fill(0);
  text("score: " + score, 20, 20)
  update();
    for(let obj of objects){
    obj.update();
    obj.draw();
  }
  
  noFill();
  stroke(255, 0, 0);
  rectMode(CENTER);
  rect(basket.x, basket.y, basket.size, basket.size)
  
  if (keyIsDown(LEFT_ARROW) === true) basket.move("left");
  if (keyIsDown(RIGHT_ARROW) === true) basket.move("right");
  
  basket.update();
  basket.draw();
}

