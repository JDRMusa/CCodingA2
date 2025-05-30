let img;

function preload(){
  img = loadImage('JamesBond.png')
}

function setup() {
  createCanvas(1600, 800);
  
  background('black');
  
  clip(mask)

  image(img,0,0,1600,800);
}

function draw(){ 
  noFill();
  noStroke();
  x = mouseX;
  y = mouseY;
  mask();
}

function mask() {
  circle(500,400,800);
}