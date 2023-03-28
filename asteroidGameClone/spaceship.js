class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.downwards_pointing = new createVector(0,0.5);
    this.friction = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
    this.angle = 0;
    ellipseMode(CENTER);
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
    this.jetfire();
  }

  draw(){
    //jet
    if (this.velocity.mag()!=0) {
      let radius = width/map(this.velocity.mag(),0,this.maxVelocity,6 ,2.5);
      let h = 20;
      push();
      translate(this.location.x, this.location.y);
      rotate(this.angle);
      for (let r = radius; r > 0; --r) {
        fill(h, 100, 90);
        arc(0, 0, this.size, r, QUARTER_PI, HALF_PI+QUARTER_PI, CHORD);
        h = (h + 0.5) % 250;
      }
      pop();
    }
    fill(125);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);

  }

  move(){
    // YOUR CODE HERE (4 lines)
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0.1,0));
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0,-0.1));
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0,0.1));
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    var downwards_pointing = createVector(0, 0.05);
    var friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-0.01);
    this.applyForce(downwards_pointing);
    this.applyForce(friction);
  }
  jetfire(){
    if (keyIsDown(LEFT_ARROW)){
      this.angle = PI*3/2;
    }
    if (keyIsDown(RIGHT_ARROW)){
      this.angle = HALF_PI;
    }
    if (keyIsDown(UP_ARROW)){
    // YOUR CODE HERE (1 line)
      this.angle = 0;
    }
    if (keyIsDown(DOWN_ARROW)){
    // YOUR CODE HERE (1 line)
      this.angle = PI;
    }
}
}
