var imgs = [];
var avgImg;
var lerpImg;
var numOfImages = 30;
var randomImg;
//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    //Images loaded
    for (let i = 0; i < numOfImages; i++) {
        filename  = 'assets/'+ i +'.jpg';
        imgs[i] = loadImage(filename); 
    }
}
//////////////////////////////////////////////////////////
function setup() {
    // Image initialised
    createCanvas(100, 100);
    createCanvas(imgs[0].width * 2, imgs[0].height);
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
    lerpImg = createGraphics(imgs[0].width, imgs[0].height);
    randomImg = imgs[0];
    pixelDensity(1);
}
//////////////////////////////////////////////////////////
//right arrow pressed to get random left picture
function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        randomImg = random(imgs);
    }
    image(randomImg, 0, 0);
    loop();
}
function mouseMoved() {
    lerpPicture();
}
//lerp picture to see transition
function lerpPicture() {
    let amt = map(mouseX,0,width,1,0);
    lerpImg.loadPixels();

    for (let y = 0; y < imgs[0].height; y++){
        for (let x = 0; x < imgs[0].width; x++) {
            let index = (imgs[0].width * y + x) * 4;
            let v1 = createVector(randomImg.pixels[index + 0], randomImg.pixels[index + 1], randomImg.pixels[index + 2]);
            let v2 = createVector(avgImg.pixels[index + 0], avgImg.pixels[index + 1], avgImg.pixels[index + 2]);
            //get lerp value from original picture to average picture
            let v3 = p5.Vector.lerp(v1, v2, amt);
            lerpImg.pixels[index + 0] = v3.x;
            lerpImg.pixels[index + 1] = v3.y;
            lerpImg.pixels[index + 2] = v3.z;
            lerpImg.pixels[index + 3] = avgImg.pixels[index + 3];
        }
    }
    lerpImg.updatePixels();
    image(lerpImg, lerpImg.width, 0);
    noLoop();
}
function draw() {
    background(125);
    image(randomImg, 0, 0);
    //Images are looped over
    for (let i = 0; i < numOfImages; i++) {
        imgs[i].loadPixels();
    }
    avgImg.loadPixels();
     for (let y = 0; y < imgs[0].height; y++){
        for (let x = 0; x < imgs[0].width; x++) {
            let index = (imgs[0].width * y + x) * 4;
            //Face appears on the left, and the right side of the canvas is red
            let redChannel = imgs[0].pixels[index + 0];
            let alphaChannel = imgs[0].pixels[index + 3];
            avgImg.pixels[index + 0] = redChannel;
            avgImg.pixels[index + 3] = alphaChannel;
            //Average image appears on right side of the canvas
            let sumR = 0;
            let sumG = 0;
            let sumB = 0;
            for (let i = 0; i < numOfImages; i++) {
                sumR += imgs[i].pixels[index + 0];
                sumG += imgs[i].pixels[index + 1];
                sumB += imgs[i].pixels[index + 2];
            }
            avgImg.pixels[index + 0] = sumR/numOfImages;
            avgImg.pixels[index + 1] = sumG/numOfImages;
            avgImg.pixels[index + 2] = sumB/numOfImages;
            avgImg.pixels[index + 3] = alphaChannel;
        }
    }
    avgImg.updatePixels();
    image(avgImg, avgImg.width, 0);
    noLoop();

}
