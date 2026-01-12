class Tower {
  constructor(x, y, size, img, range, speed, dmg) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = img;

    this.range = range;
    this.speed = speed;
    this.dmg = dmg;

    this.cooldown = 0;
  }

  update(enemies) {
    this.cooldown--;

    if (this.cooldown > 0) return null;

    for (let e of enemies) {
      if (!e.alive) continue;

      let d = dist(this.x, this.y, e.pos.x, e.pos.y);
      if (d < this.range) {
        this.cooldown = this.speed;


        return new Projectile(
          this.x,
          this.y,
          e,
          5,
          this.dmg,
          40
        );
      }
    }

    return null;
  }

  draw() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size, this.size);
  }
}
