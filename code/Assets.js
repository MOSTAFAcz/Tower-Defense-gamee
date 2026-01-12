let bg; // assety hry prostě
let images = {};

function preloadAssets() {
  bg = loadImage("./images/background.png");
  images["soldier"] = loadImage("./images/goblin.png");
  images["eliteGuard"] = loadImage("./images/EliteGuard.png");
  images["boss"] = loadImage("./images/Boss.png");
  images["tower"] = loadImage("./images/tower.png");
}
