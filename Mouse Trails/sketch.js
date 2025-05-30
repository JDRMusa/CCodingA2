let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSB, 360, 255, 255, 255); // ← This should go here
}


function draw() {
  background(0); // Slightly transparent background for fading effect

  // Add current mouse position to trail
  trail.push({ x: mouseX, y: mouseY, time: millis() });

  // Limit trail length
  if (trail.length > 50) {
    trail.shift();
  }

  // Draw trail
  for (let i = 0; i < trail.length; i++) {
    let pos = trail[i];
    let age = millis() - pos.time;

    let alpha = map(i, 0, trail.length, 0, 255);
    let size = map(i, 0, trail.length, 5, 20);
    let hue = map(i, 0, trail.length, 0, 360);

    fill(hue, 255, 255, alpha);
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(hue, 255, 255, alpha);
    ellipse(pos.x, pos.y, size, size);
  }
}

// Enable HSB color mode and window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === 's') {
    saveCanvas('mouse-trail', 'png');
  }
} //Apparently I should use this but I forgot