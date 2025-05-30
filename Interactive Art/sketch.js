let palette = [];
let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  generatePalette();
  background(0);
}

function draw() {
  // Fade background for trail effect
  fill(0, 15);
  rect(0, 0, width, height);

  // Draw ripple under mouse
  let c = random(palette);
  fill(c[0], c[1], c[2], 100);
  ellipse(mouseX, mouseY, random(10, 30));

  // Update and draw all bubbles
  for (let b of bubbles) {
    b.update();
    b.display();
  }
}

function mousePressed() {
  // Add a new bubble at mouse location
  bubbles.push(new Bubble(mouseX, mouseY));
  generatePalette(); // optional: refresh palette on click
}

function generatePalette() {
  palette = [];
  for (let i = 0; i < 5; i++) {
    palette.push([random(100, 255), random(100, 255), random(100, 255)]);
  }
}

class Bubble {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-2, 0));
    this.acc = createVector(0, 0.05); // gravity
    this.radius = random(20, 50);
    this.color = random(palette);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // Bounce on bottom edge
    if (this.pos.y + this.radius / 2 > height) {
      this.pos.y = height - this.radius / 2;
      this.vel.y *= -0.7; // lose some energy
    }
  }

  display() {
    fill(this.color[0], this.color[1], this.color[2], 180);
    ellipse(this.pos.x, this.pos.y, this.radius);
  }
}