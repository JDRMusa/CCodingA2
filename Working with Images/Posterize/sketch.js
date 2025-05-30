let pic;

function setup() {
  pic=loadImage('https://pbs.twimg.com/media/E_d6MRPVgAQX6AT.jpg');
}

function draw() {
  createCanvas(1000,1000);
  
  image(pic,0,0);
  
  filter(POSTERIZE);
}