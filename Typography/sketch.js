var font;

function preload() {
  font = loadFont("Arcane Nine.otf");
}

var points;
function setup() {
  createCanvas(400, 400);
  stroke('rgb(70,52,2)');
  points = font.textToPoints("From ashes and dust", 50, 200, 35, {
    sampleFactor: 0.4,
  });

  background('rgb(187,66,66)');
  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    ellipse(p.x, p.y, 3, 3);
  }
}