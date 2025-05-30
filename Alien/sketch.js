function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
}
//Gradient came from Kazuki Umeda

function draw() {
  background(0);
  linearGradient(
    width/2-200, height/2-200, //Start point
    width/2+200, height/2+200, //End point
    color(310, 100, 100, 100), //Start color
    color(250, 100, 100, 100), //End color
  );
  rect(width/2, height/2, 400, 400, 50);
  shadow();
  
  strokeWeight(10);
  fill('rgb(133,255,136)');
  curve(-2250, 2250, 200, 300, 200, 300, 2600, 2250)
  
  noFill();
  arc(200, 250, 50,50,20,160);
  
  fill('black');
  stroke('black');
  angleMode(DEGREES);
  rotate(-50);
  ellipse(-60,250,50,80)
  rotate(100)
  ellipse(320,-58,50,80)
}

function linearGradient(sX, sY, eX, eY, colorS, colorE){
  let gradient = drawingContext.createLinearGradient(
    sX, sY, eX, eY
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
  // drawingContext.strokeStyle = gradient;
}

function shadow(){
  drawingContext.shadowOffsetX = 14;
  drawingContext.shadowOffsetY = 14;
  drawingContext.shadowBlur = 14;
  drawingContext.shadowColor = color(230, 30, 18, 100);
}