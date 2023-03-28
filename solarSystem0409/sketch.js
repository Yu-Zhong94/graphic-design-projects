// let d = 1;
// function setup() {
//     let cnv = createCanvas(900, 700);
//     cnv.mouseWheel(changeSize);
    
// }

// function draw() {
    
//     background(0);
//     let speed = frameCount;
//     scale(d);

//     push();
//     translate(width/2, height/2);
//     // Make the sun spin around its axis at a slow speed/3.
//     rotate(radians(speed/3));
//     celestialObj(color(255,150,0), 200); // SUN
//     pop();
    
//     // Rotate the earth around the sun at velocity "speed"
//     translate(width/2, height/2);
//     rotate(radians(speed));
//     push();
//     translate(300,0);
//     //Make the earth spin around its axis at velocity "speed"
//     rotate(radians(speed));
//     celestialObj(color(0,0,255), 80); // EARTH
//     pop();

//     //Make the moon rotate at velocity -speed*2
//     translate(300,0);
//     rotate(radians(-speed*2));
//     push();
//     translate(100,0);
//     celestialObj(color(255,255,255), 30); // MOON
//     pop();

//     // another rotating satellite
//     rotate(radians(-speed*2));
//     push();
//     translate(75,0);
//     celestialObj(color(255,0,255), 20);  
//     pop();
// }

// function celestialObj(c, size){

//     strokeWeight(5);
//     fill(c);
//     stroke(0);

//     ellipse(0, 0, size, size);
//     line(0, 0, size/2, 0);
// }

// function changeSize(event) {
//     if (event.deltaY > 0) {
//       d = d + 0.04;
//     } else {
//       d = d - 0.04;
//     }
// }

let d = 1;
function setup() {
    let cnv = createCanvas(900, 700);
    cnv.mouseWheel(changeSize);
}

function draw() {
    
    background(0);
    let speed = frameCount;
    //zoom in and out 
    scale(d);
    //initiate rotating sun
    spinningObj(width/2, height/2, radians(speed/3), color(255,150,0), 200);
    
    // Rotate the earth around the sun at velocity "speed"
    translate(width/2, height/2);
    rotate(radians(speed));
    //initiate rotating earth
    spinningObj(300, 0, radians(speed), color(0,0,255), 80);

    //Make the moon rotate at velocity -speed*2
    translate(300,0);
    rotate(radians(-speed*2));
    //initiate rotating moon
    spinningObj(100, 0, null, color(255,255,255), 30);

    // another rotating satellite
    rotate(radians(-speed*2));
    // initiate another rotating satellite
    spinningObj(75, 0, null, color(255,0,255), 20);
}

const celestialObj = (c, size) => {
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}

const spinningObj = (x, y, radspeed, c, size) => {
    push();
    translate(x,y);
    if (radspeed)
        rotate(radspeed);
    celestialObj(c, size); 
    pop();
}
//use mousewheel change the d value
const changeSize = (event) => {
    if (event.deltaY > 0) {
        d = d + 0.04;
    } else {
        d = d - 0.04;
    }
}