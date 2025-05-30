let pic,x,y;

function preload(){
  pic=loadImage('monalisa.jpg');
}
function setup() {
  createCanvas(500, 500);
  background(0);
  noStroke()
}

function draw() {
  background(0);
  y=mouseY;
  x=mouseX;
  image(pic,0,0);
  var c=get(x,y);
  fill (c);
  ellipse(x,y,50,50);
}