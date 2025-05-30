let pic;

function preload() {
  pic = loadImage("https://64.media.tumblr.com/849d1bdf8d76c3c85dcfaf6cdcc87b4a/20b8c4fddb61f5c8-90/s640x960/b171f7ea7d30ce7437d36fa254a2031106967413.jpg");
}

function setup() {
  createCanvas(622, 350);
  background(0);
  clip(mask);
}

function mask(){
  ellipse(311,175,622,350);
}

function draw() {
  image(pic, 0, 0)
  let x = random(width);
  let y = random(height);
  let r = random(20, 80);
  fill(random(255), 0, random(255), 100);
  circle(x, y, r);
  fill(50);
  stroke('gold');
  strokeWeight(1);
  textSize(25)
  textAlign(CENTER,CENTER)
  text("Out of Body", 311, 175);
}
