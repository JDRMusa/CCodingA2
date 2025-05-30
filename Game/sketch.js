let tileSize = 32;
let gold = 100;
let wave = 0;
let waveButton;
let lives = 10;
let noEnemies = 0;
let selectedTower = "A";
let ftowerIMG;
let atowerIMG;
let arrowTowerButton;
let frostTowerButton;
let uiPanel;
let startScreenDiv;
let startGameButton;
let gameStarted = false;
let maxWaves = 10;
let enemiesPerWave = 10;
let gameOver = false;
let gameWon = false;
let gameOverScreen, gameWonScreen;
let restartButton;


function preload(){
  bg = loadImage('Map.jpg');
  ftowerIMG = loadImage('Tower_1.png');
  atowerIMG = loadImage('Tower_2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(225);

  // Start Screen
  startScreenDiv = createDiv();
  startScreenDiv.position(0, 0);
  startScreenDiv.size(windowWidth, windowHeight);
  startScreenDiv.style('background', 'rgba(0, 0, 0, 0.85)');
  startScreenDiv.style('display', 'flex');
  startScreenDiv.style('flex-direction', 'column');
  startScreenDiv.style('justify-content', 'center');
  startScreenDiv.style('align-items', 'center');
  startScreenDiv.style('color', 'white');
  startScreenDiv.style('font-size', '40px');
  startScreenDiv.style('font-family', 'Arial');
  startScreenDiv.html('<h1>🛡️ Tower Defense</h1><p style="font-size: 20px;">Click to begin your   defense!</p>');

  startGameButton = createButton("Start Game");
  startGameButton.parent(startScreenDiv);
  startGameButton.style('font-size', '24px');
  startGameButton.style('padding', '10px 30px');
  startGameButton.style('margin-top', '20px');
  startGameButton.mousePressed(() => {
    startScreenDiv.hide();
    gameStarted = true;
  });
  
  allSprites.tileSize = tileSize;

  tower = new Group();
  tower.collider = "s";
  tower.type = "A";
  tower.color = "red";
  tower.img = atowerIMG;

  frostTower = new tower.Group();
  frostTower.color = "blue";
  frostTower.img = ftowerIMG
  frostTower.type = "F";

  uiPanel = createDiv();
  uiPanel.position(width - 280, 30);
  uiPanel.size(160, 200);
  uiPanel.style('background', 'rgba(0, 0, 0, 0.5)');
  uiPanel.style('padding', '15px');
  uiPanel.style('border-radius', '15px');
  uiPanel.style('color', 'white');
  uiPanel.style('font-family', 'Arial');
  uiPanel.style('box-shadow', '0 0 10px rgba(0,0,0,0.5)');

  waveButton = createButton("Start Wave");
  waveButton.parent(uiPanel);
  waveButton.style('width', '100%');
  waveButton.style('margin-bottom', '10px');
  waveButton.mousePressed(startWave);
  waveButton.style('background-color', '#FFD700');
  waveButton.style('border-radius', '10px');

  
  arrowTowerButton = createButton("Arrow Tower");
  arrowTowerButton.parent(uiPanel);
  arrowTowerButton.style('width', '100%');
  arrowTowerButton.style('margin-bottom', '10px');
  arrowTowerButton.style('border-radius', '10px');
  arrowTowerButton.mousePressed(() => 
                                {selectedTower = "A";
                                 updateTowerButtonStyles();});
  
  frostTowerButton = createButton("Frost Tower");
  frostTowerButton.parent(uiPanel);
  frostTowerButton.style('width', '100%');
  frostTowerButton.style('border-radius', '10px');
  frostTowerButton.mousePressed(() => 
                                {selectedTower = "F";
                                 updateTowerButtonStyles();});
  
  updateTowerButtonStyles();
  
  placeable = new Group();
  placeable.tile = "1";
  placeable.w = 1;
  placeable.h = 1;
  placeable.color = "green";
  placeable.collider = "n";
  placeable.visible = false

  start = new Group();
  start.tile = "s";
  start.visible = false;

  end = new Group();
  end.tile = "f";
  end.visible = false;

  node = new Group();
  node.w = 1;
  node.h = 1;
  node.collider = "n";

  enemies = new Group();
  enemies.w = 1;
  enemies.h = 1;
  enemies.counter = 0;
  enemies.collider = "k";
  enemies.health = 1;
  enemies.moveSpeed = 0.05;

  projectile = new Group();
  projectile.radius = 0.3;
  projectile.collider = "n";
  projectile.life = 100;

  tilemap = new Tiles(
    [
      "111111.s1111111111",
      "111111..1111111111",
      "111111.........111",
      "111111.........111",
      "1111111111111..111",
      "11111111.......111",
      "1111111........111",
      "111111..1111111111",
      "111111.......11111",
      "111111.......11111",
      "11111111111..11111",
      "1............11111",
      "1............11111",
      "1..111111111111111",
      "1..111111111111111",
      "1..111111111111111",
      "1..111111111111111",
      "1.......1111111111",
      "1........111111111",
      "11111....111111111",
      "1111111..111111111",
      "1111111.f111111111",
    ],
    1,
    1,
    1,
    1
  );

  var matrix = [
    //0,0
    [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  let grid = new PF.Grid(matrix);
  let finder = new PF.AStarFinder();

  a = start[0].x - 1;
  b = start[0].y - 1;
  c = end[0].x - 1;
  d = end[0].y - 1;

  path = finder.findPath(a, b, c, d, grid);

  for (p of path) {
    let n = new node.Sprite(p[0] + 1, p[1] + 1);
    n.visible = false;
  }

  cursor = new Sprite(1, 1);
  cursor.collider = "n";

  setInterval(spawn, 2000);
  setInterval(towerShoot, 500);
  setInterval(frostShoot, 2000);
}

function spawn() {
  if (gameOver || gameWon) return;
  
  if (wave >= 1 && wave <= maxWaves && noEnemies < wave * enemiesPerWave){
    // Add small random offset inside the tile
    let spawnX = 8 + random(-0.3, 0.3);
    let spawnY = 1 + random(-0.3, 0.3);
    let e = new enemies.Sprite(spawnX, spawnY, 1);
    e.health = floor(random(1, wave + 1));
    e.speedModifier = 1;
    e.slowTime = 0;
    e.counter = 0; // So it can start moving along the path nodes
    noEnemies++;
  }
}


function chooseTower() {
  if (kb.presses("a")) 
    selectedTower = "A";
    updateTowerButtonStyles();
  if (kb.presses("f")) 
    selectedTower = "F";
    updateTowerButtonStyles();
}


function draw() {
  if (!gameStarted) {
    return;
  }

  if (gameOver) {
    clear();
    showGameOverScreen();
    return;
    }

  if (gameWon) {
    clear();
    showGameWonScreen();
    return;
  }

  clear();
  hideCursor();
  image(bg,15,15)
  
  if (wave > 0) {
    placeTower();
    enemyMove();
    killEnemies();
    chooseTower();

    if (enemies.length === 0 && noEnemies >= wave * enemiesPerWave && wave < maxWaves) {
      waveButton.show();
    } else {
      waveButton.hide();
    }

    if (lives <= 0) {
      gameOver = true;
      uiPanel.hide();
      waveButton.hide();
    }

    allSprites.draw();
    drawHUD();

    if (enemies.length === 0 && wave >= maxWaves && noEnemies >= wave * enemiesPerWave) {
      gameWon = true;
    }

    if (enemies.length === 0 && wave < maxWaves) {
      waveButton.show();
      if (!waveButton) {
        waveButton = createButton("Start Wave");
        waveButton.position(width / 3, 30);
        waveButton.mousePressed(startWave);
      }
    }
  }
}


function killEnemies() {
  for (let p of projectile) {
    for (let e of enemies) {
      if (p.overlaps(e)) {
        e.health -= 0.2;

        if (p.type === "F") {
          e.speedModifier = 0.5;
          e.slowTime = 3000;
        // don't remove frost projectile yet, so it hits more enemies
        } else if (p.type === "A") {
          p.remove(); // remove arrow projectile on first hit
        }

        if (e.health <= 0) {
          e.remove();
          gold += 10;
        }
      }
    }
  // After checking all enemies, remove frost projectile if you want it to have limited lifetime (or if it goes off screen)
  }
}


function towerShoot() {
  for (t of tower) {
    if (t.type == "A") {
      if (enemies[0]){
        t.rotation = t.angleTo(enemies[0])
      }
      if (enemies[0]) {
        let p = new projectile.Sprite(t.x, t.y);
        p.speed = 0.01;
        p.type = t.type;
        let dir = closest();
        if (dir) {
          p.direction = p.angleTo(closest());
        } else {
          p.direction = p.angleTo(enemies[0]);
        }
      }
    }
  }
}

function frostShoot() {
  for (t of tower) {
    if (t.type == "F") {
      if (enemies[0]){
        t.rotation = t.angleTo(enemies[0])
      }
      if (enemies[0]) {
        let p = new projectile.Sprite(t.x, t.y);
        p.radius = 0.5;
        p.speed = 0.01;
        p.type = t.type;
        let dir = closest();
        if (dir) {
          p.direction = p.angleTo(closest());
        } else {
          p.direction = p.angleTo(enemies[0]);
        }
      }
    }
  }
}

function closest() {
  let minDist = Infinity;
  let closestEnemy = null;

  for (let en of enemies) {
    let d = dist(cursor.x, cursor.y, en.x, en.y);
    if (d < minDist) {
      minDist = d;
      closestEnemy = en;
    }
  }

  return closestEnemy;
}


function placeTower() {
  cursor.x = floor(mouse.x / tileSize);
  cursor.y = floor(mouse.y / tileSize);
  let cost = selectedTower === "F" ? 30 : 50;
  if (
    cursor.overlapping(placeable) &&
    mouse.released() &&
    !cursor.overlapping(tower) &&
    gold >= cost
  ) {
    switch (selectedTower) {
      case "F":
        t = new frostTower.Sprite(cursor.x, cursor.y);
        gold -= 30;
        break;
      case "A":
        t = new tower.Sprite(cursor.x, cursor.y);
        gold -= 50;
        break;
    }
  }

  if (cursor.overlapping(placeable)) {
    cursor.color = "white";
  } else {
    cursor.color = "red";
  }
}

function enemyMove() {
  for (e of enemies) {
    if (e.slowTime > 0) {
      e.slowTime -= deltaTime; // deltaTime is milliseconds since last frame
      if (e.slowTime <= 0) {
        e.speedModifier = 1;
        e.slowTime = 0;
      }
    }
  }
  
  for (e of enemies) {
    e.text = floor(e.health);
    switch (e.health) {
      case 2:
        e.color = "purple";
        break;
      case 3:
        e.color = "red";
        break;
      default:
        e.color = "blue";
    }
    if (node[e.counter]) {
      e.moveTo(node[e.counter], e.moveSpeed * e.speedModifier);
      if (e.overlapping(node[e.counter])) {
        e.counter += 1;
      }
    }
    if (e.overlapping(end[0])) {
      lives -= e.health;
      e.remove();
    }
  }
}

function drawHUD() {
  fill(255, 255, 255, 100);
  rect(20, 1, 100, 100);
  fill(0);
  textSize(20);
  text("Gold:" + gold, 20, 20);
  text("Lives:" + floor(lives), 20, 40);
  text("Selected:" + selectedTower, 20, 60);
  text("Wave:" + wave, 20, 80);
}

function startWave() {
  if (wave < maxWaves && enemies.length === 0) {
    wave += 1;
    noEnemies = 0;
    waveButton.hide();
  }
}

function hideCursor(){
  if (cursor.x > 18 || cursor.y > 22){
    cursor.visible = false
  }
  else{
    cursor.visible = true
  }
}

function updateTowerButtonStyles() {
  if (selectedTower === "A") {
    arrowTowerButton.style('background-color', selectedTower === "A" ? '#F44336' : '');
    frostTowerButton.style('background-color', selectedTower === "F" ? '#2196F3' : '');
  } else if (selectedTower === "F") {
    arrowTowerButton.style('background-color', selectedTower === "A" ? '#F44336' : '');
    frostTowerButton.style('background-color', selectedTower === "F" ? '#2196F3' : '');
  }
}

function showGameOverScreen() {
  fill(0, 0, 0, 200);
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);
  fill("red");
  textSize(60);
  text("💀 GAME OVER 💀", width / 2, height / 2 - 40);

  if (!restartButton) {
    restartButton = createButton('Restart Game');
    restartButton.position(width / 2 - 60, height / 2 + 20);
    restartButton.style('font-size', '24px');
    restartButton.style('padding', '10px 20px');
    restartButton.mousePressed(restartGame);
  }
}

function restartGame() {
  console.log("Restarting game...");

  // Remove enemies and all groups fully:
  while (enemies.length > 0) {
    enemies[0].remove();
  }
  while (tower.length > 0) {
    tower[0].remove();
  }
  while (frostTower.length > 0) {
    frostTower[0].remove();
  }
  while (projectile.length > 0) {
    projectile[0].remove();
  }

  console.log("Enemies left after removal: " + enemies.length);

  // Reset variables
  gold = 100;
  wave = 0;
  lives = 10;
  noEnemies = 0;
  gameOver = false;
  gameWon = false;
  gameStarted = true;

  // Show UI elements again
  uiPanel.show();
  waveButton.show();

  // Remove restart button if exists
  if (restartButton) {
    restartButton.remove();
    restartButton = null;
  }

  loop();
}

function showGameWonScreen() {
  fill(0, 0, 0, 200);
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);
  fill("green");
  textSize(60);
  text("🎉 YOU WIN! 🎉", width / 2, height / 2 - 40);

  if (!restartButton) {
    restartButton = createButton('Play Again');
    restartButton.position(width / 2 - 60, height / 2 + 20);
    restartButton.style('font-size', '24px');
    restartButton.style('padding', '10px 20px');
    restartButton.mousePressed(restartGame);
  }
}
