class Game {
  constructor(towerPlacement) {
    this.towerPlacement = towerPlacement;

    // entity ve hře
    this.towers = [];
    this.enemies = [];
    this.projectiles = [];

    this.buildMenuOpen = false;
    this.selectedSpot = null;

    this.currentWave = 0;
    this.nextEnemyIndex = 0;

    this.spawnCooldown = 60;
    this.waveCooldown = 0;

    this.playerHP = 5;
    this.currency = 10;

    this.gameState = "PLAYING"; // PLAYING | WIN | GAMEOVER
  }

  // =========================
  // INPUT
  // =========================
  handleMousePressed(mx, my) {
    if (this.gameState !== "PLAYING") return;

    // klik na build menu
    if (this.buildMenuOpen) {
      this.handleBuildMenuClick(mx, my);

      let x = width - 140;
      let y = 100;

      // klik mimo menu = zavřít
      if (mx < x || mx > x + 120 || my < y || my > y + 200) {
        this.closeBuildMenu();
      }
      return;
    }

    // klik na build spot
    for (let spot of this.towerPlacement.towers) {
      let size = 40;
      let half = size / 2;

      if (
        mx > spot.x - half &&
        mx < spot.x + half &&
        my > spot.y - half &&
        my < spot.y + half
      ) {
        if (!spot.occupied) {
          this.selectedSpot = spot;
          this.buildMenuOpen = true;
        }
        return;
      }
    }
  }

  // =========================
  // UPDATE
  // =========================
update() {
  // update běží jen při hraní
  if (this.gameState !== "PLAYING") return;

  // =========================
  // TOWERS
  // =========================
  for (let t of this.towers) {
    let p = t.update(this.enemies);
    if (p) this.projectiles.push(p);
  }

  // =========================
  // PROJECTILES
  // =========================
  for (let p of this.projectiles) {
    p.update(this.enemies);
  }

  // =========================
  // ENEMIES
  // =========================
  for (let e of this.enemies) {
    e.update();

    // reward za zabití (pouze jednou)
    if (!e.alive && !e.rewardGiven) {
      this.currency += e.reward;
      e.rewardGiven = true;
    }

    // enemy došel do cíle → odečti HP
    if (e.stopped) {
      this.playerHP--;
    }
  }

  // odstranění enemy co došli do cíle
  this.enemies = this.enemies.filter(e => e.alive && !e.stopped);

  // odstranění mrtvých projektilů
  this.projectiles = this.projectiles.filter(p => p.alive);

  // =============
  // WIN CONDITION
  // =============
  if (
    this.currentWave >= waves.length &&
    this.enemies.length === 0
  ) {
    this.gameState = "WIN";
    noLoop();
    return;
  }

  // =========================
  // GAME OVER
  // =========================
  if (this.playerHP <= 0) {
    this.gameState = "GAMEOVER";
    noLoop();
    return;
  }

  // =========================
  // WAVE LOGIC
  // =========================
  if (this.currentWave >= waves.length) return;

  if (this.waveCooldown > 0) {
    this.waveCooldown--;
    return;
  }

  this.spawnCooldown--;
  if (this.spawnCooldown <= 0) {
    this.spawnEnemy();
    this.spawnCooldown = 60;
  }
}


  // =========================
  // DRAW
  // =========================
  draw() {
    // UI
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("HP: " + this.playerHP, 20, 30);
    text("CURRENCY: " + this.currency, 20, 50);

    for (let t of this.towers) t.draw();
    for (let p of this.projectiles) p.draw();
    for (let e of this.enemies) e.draw();

    this.towerPlacement.draw(this.selectedSpot);

    if (this.buildMenuOpen) {
      this.drawBuildMenu();
    }

    if (this.gameState === "WIN") this.drawWinScreen();
    if (this.gameState === "GAMEOVER") this.drawGameOverScreen();
  }

  // =========================
  // BUILD MENU
  // =========================
  drawBuildMenu() {
    let x = width - 160;
    let y = 100;

    rectMode(CORNER);
    fill(30);
    rect(x, y, 150, 200, 8);

    fill(255);
    textAlign(CENTER);
    text("BUILD (cost: 5)", x + 75, y + 25);
    text("Tower", x + 75, y + 70);
    text("Cancel", x + 75, y + 165);
  }

  handleBuildMenuClick(mx, my) {
    let x = width - 140;
    let y = 100;

    if (mx > x && mx < x + 120 && my > y + 50 && my < y + 90) {
      this.buildTower();
      return;
    }

    if (mx > x && mx < x + 120 && my > y + 150 && my < y + 190) {
      this.closeBuildMenu();
    }
  }

  // =========================
  // TOWER
  // =========================
  buildTower() {
    if (this.currency < 5) {
      alert("You dont have enough money!");
      return;
    }

    if (!this.selectedSpot) return;

    this.currency -= 5;

    let tower = new Tower(
      this.selectedSpot.x,
      this.selectedSpot.y,
      70,
      images.tower,
      100,
      60,
      25
    );

    this.towers.push(tower);
    this.selectedSpot.occupied = true;
    this.closeBuildMenu();
  }

  closeBuildMenu() {
    this.buildMenuOpen = false;
    this.selectedSpot = null;
  }

  // =========================
  // ENEMIES
  // =========================
  spawnEnemy() {
    let wave = waves[this.currentWave];
    if (!wave) return;

    if (this.nextEnemyIndex >= wave.enemies.length) {
      this.currentWave++;
      this.nextEnemyIndex = 0;
      this.waveCooldown = 300;
      return;
    }

    let type = wave.enemies[this.nextEnemyIndex];

    if (type === 1)
      this.enemies.push(new Soldier(960, 330, 50, images.soldier, 150, 1, 1, path, 5));

    if (type === 2)
      this.enemies.push(new EliteGuard(960, 330, 50, images.eliteGuard, 500, 2, 0.7, path, 10));

    if (type === 3)
      this.enemies.push(new Boss(960, 330, 60, images.boss, 2500, 5, 0.4, path, 20));

    this.nextEnemyIndex++;
  }

  // =========================
  // SCREENS
  // =========================
  drawWinScreen() {
    fill(0, 180);
    rect(0, 0, width, height);

    fill(0, 255, 0);
    textAlign(CENTER);
    textSize(48);
    text("YOU WIN!", width / 2, height / 2 - 40);

    textSize(20);
    text("Remaining HP: " + this.playerHP, width / 2, height / 2 + 10);
    text("Final Currency: " + this.currency, width / 2, height / 2 + 40);
  }

  drawGameOverScreen() {
    fill(0, 180);
    rect(0, 0, width, height);

    fill(255, 50, 50);
    textAlign(CENTER);
    textSize(48);
    text("GAME OVER", width / 2, height / 2);
  }
}
