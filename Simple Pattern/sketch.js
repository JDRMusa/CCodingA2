var circleSize = 80;

function setup() {
  createCanvas(500, 500);
  translate(circleSize/2, circleSize/2);

for(var x=0; x<width; x+=circleSize)
  {
    for(var y=0; y<height; y+=circleSize)
      {
        noStroke();
        fill ('orange');
        ellipse(x, y, circleSize*1.8, circleSize*1.8);
        
        stroke('black');
        fill ('pink');
        ellipse(x, y, circleSize*1.2, circleSize*1.2);
        
        noStroke();
        fill (255);
        ellipse(x, y, circleSize*0.3, circleSize*0.3);
      }
  }
}