class Projectile {
  constructor(x, y, target, speed, dmg, range) {
    this.x = x;
    this.y = y;

    this.target = target; // enemy objekt
    this.speed = speed;
    this.dmg = dmg;
    this.range = range;

    this.alive = true;
  }

  update(enemies) {
    if (!this.target || this.target.hp <= 0) {
      this.alive = false;
      return;
    }

    let dx = this.target.pos.x - this.x;
    let dy = this.target.pos.y - this.y;
    let d = sqrt(dx * dx + dy * dy);

    if (d < this.speed) {
      this.explode(enemies);
      this.alive = false;
      return;
    }

    this.x += (dx / d) * this.speed;
    this.y += (dy / d) * this.speed;
  }

  draw() {
    fill(255, 200, 0);
    noStroke();
    circle(this.x, this.y, 6);
  }

  explode(enemies) {
    if (this.target) {
      this.target.hp -= this.dmg;
    }

    if (this.range > 0) {
      for (let enemy of enemies) {
        let dx = enemy.pos.x - this.x;
        let dy = enemy.pos.y - this.y;
        let dist = sqrt(dx * dx + dy * dy);
        if (dist <= this.range) {
          enemy.hp -= this.dmg;
        }
      }
    }
  }
}
