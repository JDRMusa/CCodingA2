function setup() {
  createCanvas(400, 400);
  
}

function draw() {
  background("rgb(95,204,253)");
  stroke("green");
  fill("green");
  rect(0,250,400);
  fill("gray");
  rect(0,260,400);
  fill("black");
  noStroke();
  rect(0,300,20);
  rect(50,300,70,20);
  rect(150,300,70,20);
  rect(250,300,70,20);
  rect(350,300,70,20);
  
  fill("rgb(111,111,111)");
  stroke("rgb(111,111,111)");
  quad(220,150,220,270,50,250,50,200);
  quad(220,150,220,270,370,250,370,220);
  
  stroke("black");
  fill("rgb(37,37,37)");
  quad(170,195,170,170,220,155,325,205);
  
  fill("rgb(37,37,37)");
  stroke("rgb(37,37,37)");
  strokeWeight(10);
  line(54,250,80,250);
  line(54,255,80,255);
  line(80,266,80,240);
  line(80,240,100,213);
  line(100,213,135,213);
  line(140,213,160,240);
  line(160,240,160,265);
  line(130,265,300,265);
  line(282,265,282,240);
  line(282,240,300,216);
  line(300,216,335,216);
  line(339,216,355,240);
  line(355,240,355,266);
  line(356,266,366,260);
  line(355,250,366,250);
  line(366,250,364,260);
  
  beginShape();
  vertex(54,250);
  vertex(80,250);
  vertex(80,265);
  vertex(54,260)
  endShape();
  
  stroke("rgb(37,37,37)")
  strokeWeight(1);
  fill("black");
  
  beginShape();
  vertex(80,270);
  vertex(80,240);
  vertex(100,213);
  vertex(140,213);
  vertex(159,240);
  vertex(159,270);
  endShape(CLOSE);
  
  beginShape();
  vertex(282,269);
  vertex(282,240);
  vertex(300,213);
  vertex(340,213);
  vertex(357,240);
  vertex(357,269);
  endShape(CLOSE);
  
  stroke("rgb(37,37,37)")
  fill("rgb(37,37,37)");
  circle(120,250,70);
  circle(320,250,70);
}


