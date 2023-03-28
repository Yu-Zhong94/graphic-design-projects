var stepSize = 20;

var xCord;
function setup() {
  createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);
  xCord = map(mouseX,0,width,10,0.01);
  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
 
  noStroke();
  let width = 25;
  let height = 25;
  let from = color(255, 0, 255);
  let to = color(0, 255, 255);
  
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let n = noise(stepSize*i/1000, stepSize*j/1000, frameCount*xCord/800);
      //use the noise set grid color
      let lerp = lerpColor(from, to, n);
      fill(lerp);
      rect (stepSize*i, stepSize*j, stepSize, stepSize);
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here
  angleMode(DEGREES);
  let width = 25;
  let height = 25;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      push();
      translate(stepSize/2+stepSize*i, stepSize/2+stepSize*j);
      let n = noise((stepSize/2+stepSize*i)/1000, (stepSize/2+stepSize*j)/1000, frameCount*xCord/1000);
      let rad = map(n, 0, 1, 0, 720);
      rotate(rad);
      //use the noise to change the length and color of line
      stroke(0,map(n,0,1,0,255),map(n,0,1,50,0));
      strokeWeight(5);
      line(0,0,0,map(n,0,1,stepSize*0.5,stepSize*2));
      pop();
    }
  }
}
