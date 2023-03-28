var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
let collisionSound1;
let collisionSound2;
let collisionSound3;
//////////////////////////////////////////////////

function setup() {
  createCanvas(1200,800);
  collisionSound1 = loadSound('assets/sound1.mp3');
  collisionSound3 = loadSound('assets/sound3.mp3');
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();
  densityLevel();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements

  displayScore();
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for (let i = 0; i < asteroids.locations.length; i++) {
      if(isInside(spaceship.location, spaceship.size/2, asteroids.locations[i], asteroids.diams[i]/2)) 
        gameOver();
    }
    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for (let i = 0; i < asteroids.locations.length; i++) {
      if(isInside(earthLoc, earthSize.x/2, asteroids.locations[i], asteroids.diams[i]/2)) 
        gameOver();
    }
    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location, spaceship.size/2, earthLoc, earthSize.x/2)) 
      gameOver();
    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.x/2)) 
      spaceship.setNearEarth();
    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    for (let i = 0; i <spaceship.bulletSys.bullets.length; i++) {
      for (let j=0; j< asteroids.locations.length; j++){
        if(isInside(spaceship.bulletSys.bullets[i], spaceship.bulletSys.diam/2, asteroids.locations[j], asteroids.diams[j]/2)) 
          asteroids.destroy(j);
          
      }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
  if (dist(locA.x, locA.y, locB.x, locB.y) < (sizeA+sizeB)) {
    return true;
  } else return false;
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
    collisionSound3.play();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  collisionSound1.play();
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}

function displayScore(){
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text(`SCORE: ${asteroids.score}`, width/2, 11*height/12);
}
function densityLevel(){
  frameRate(30)
  let time = frameCount;
  if (time > 1800) {
    asteroids.density = asteroids.density*1.2;
    asteroids.maxAcc = asteroids.maxAcc*1.2;
    frameCount = 0;
  }
}