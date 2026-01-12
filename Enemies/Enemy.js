class Enemy {
  constructor(x, y, size, img, hp, dmg, speed, path, reward) {
    // Inicializace vlastností nepřítele
    this.size = size;
    this.img = img;
    this.hp = hp;
    this.maxHp = hp;
    this.dmg = dmg;
    this.speed = speed;
    this.path = path;
    this.reward = reward;

    this.currentPoint = 0; // aktuální waypoint
    this.pos = { x: path[0].x, y: path[0].y }; // aktuální pozice
    this.stopped = false;

    this.alive = true; // pokud je živý
    this.rewardGiven = false;
  }

  update() {
    if (!this.alive) return; // enemy umře pokud jsou hp menší než 0
    if (this.hp <= 0) {
      this.alive = false;
      return;
    }

    let target = this.path[this.currentPoint + 1]; // přesměrování k dalšímu waypointu
    if (!target) return;

    let dx = target.x - this.pos.x;
    let dy = target.y - this.pos.y;
    let dist = sqrt(dx * dx + dy * dy);

    if (dist < this.speed) {
      this.pos.x = target.x;
      this.pos.y = target.y;
      this.currentPoint++;
      if (this.currentPoint >= this.path.length - 1) { // detekce dosažení konce 
        this.stopped = true;
      }
    } else {
      this.pos.x += (dx / dist) * this.speed;
      this.pos.y += (dy / dist) * this.speed;
    }
  }

  draw() { // vykreslení nepřítele a jeho hp baru
    if (!this.alive) return;

    imageMode(CENTER);
    image(this.img, this.pos.x, this.pos.y, this.size, this.size);

    // HP bar
    let barWidth = this.size;
    let hpPercent = this.hp / this.maxHp;

    noStroke();
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y - 6, barWidth, 4);
    fill(0, 255, 0);
    rect(this.pos.x, this.pos.y - 6, barWidth * hpPercent, 4);
  }
}