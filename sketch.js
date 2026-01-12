let game;

function preload() {
  preloadAssets(); // načtení assetů
}

function setup() {
  createCanvas(997, 590);
  
  towerPlacement = new TowerPlacement();
  game = new Game(towerPlacement);// vytvoření hlavní instance hry
}

function draw() {
  imageMode(CORNER);
  background(bg);
  game.update(); // herní logika
  game.draw(); // render 
}

function mousePressed() {
  // řešení vstupu
    game.handleMousePressed(mouseX, mouseY);
}

