var confLocs = [];
var confTheta = [];
var cubeHeightL;
var cubeHeightH;
var cubeSpeed;
function setup() {
    createCanvas(900, 800, WEBGL);
    xlength = [-400,400];
    zlength = [-400,400];
    cameraHeight = 800;
    
    // the height sliders of the cubes
    cubeHeightL = createSlider(0, 200, 100);
    cubeHeightL.position(10, 10);
    cubeHeightL.style('width', '280px');
    cubeHeightH = createSlider(0, 600, 300);
    cubeHeightH.position(10, 50);
    cubeHeightH.style('width', '280px');

    // the speed sliders of the sine wave 
    cubeSpeed = createSlider(0, 10, 1);
    cubeSpeed.position(10, 90);
    cubeSpeed.style('width', '280px');

    //A grid of tiles
    boxlength = 50;
    for (var i = 0; i < 200; i++) {
        var x = random(-500,500);
        var y = random(-800,0);
        var z = random(-500,500);
        confLocs.push([x,y,z]);
        confTheta.push(random(0,360));
        
    }
}
//set up confetti
function confetti() {
    for (var i = 0; i < confLocs.length; i++) {
        push();
        normalMaterial();
        noStroke();
        translate(confLocs[i][0],confLocs[i][1],confLocs[i][2]);
        rotateX(confTheta[i]);
        plane(15, 15);
        pop();
    }
}
function draw() {
    background(125);
    angleMode(DEGREES);
    //rotating camera
    var xLoc = cos(frameCount/5) * cameraHeight;
    var zLoc = sin(frameCount/5) * cameraHeight;
    camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);

    //cubes
    var distance = 0;
    for (var i = xlength[0]; i < xlength[1]; i+=boxlength) {
        for (var j = zlength[0]; j < zlength[1]; j+=boxlength) {
            //add a different material only to the cubes
            push();
            var dirX = (mouseX / width - 0.5) * 2;
            var dirY = (mouseY / height - 0.5) * 2;
            directionalLight(0, 180, 250, -dirX, -dirY, -1);
            specularMaterial(250);
            stroke(0);
            strokeWeight(2);
            translate(i,0,j);
            distance = dist(i,0,j,0,0,0);
            var length = map(sin(distance+frameCount*cubeSpeed.value()),-1,1,cubeHeightL.value(),cubeHeightH.value());
            box(50,length,50);
            pop();
        }
    }

    //confetti
    confetti();
    for (var i = 0; i < confLocs.length; i++) {
        confLocs[i][1] += 1;
        confTheta[i] += 10;
        if (confLocs[i][1] > 0) {
            confLocs[i][1] = -800;
        }
    }
}
