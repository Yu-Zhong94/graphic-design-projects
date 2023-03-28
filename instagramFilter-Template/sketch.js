// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var fillFilter;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
    loop();
}
// press left and right arrow to access different filters
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        image(extendedFilter(imgIn), imgIn.width, 0);
    } else if (keyCode === RIGHT_ARROW) {
        image(earlyBirdFilter(imgIn), imgIn.width, 0);
    }
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(imgIn){
    var resultImg = createImage(imgIn.width, imgIn.height);
    resultImg = sepiaFilter(imgIn);
    resultImg = darkCorners(resultImg);
    resultImg = radialBlurFilter(resultImg);
    resultImg = borderFilter(resultImg);
    return resultImg;
}
// implement Sepia filter
function sepiaFilter(img) {
    imgOut = createImage(img.width, img.height);

    imgOut.loadPixels();
    img.loadPixels();

    for (var x = 0; x < imgOut.width; x++) {
        for (var y = 0; y < imgOut.height; y++) {

            var index = (x + y * imgOut.width) * 4;

            var oldRed = img.pixels[index + 0];
            var oldGreen = img.pixels[index + 1];
            var oldBlue = img.pixels[index + 2];
            //pixels after caculation
            imgOut.pixels[index + 0] = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189);
            imgOut.pixels[index + 1] = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168);
            imgOut.pixels[index + 2] = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131);
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}
//implement dark corner using distance
function darkCorners(img) {
    var imgOut = createImage(img.width, img.height);
    imgOut.loadPixels();
    img.loadPixels();

    for (x = 0; x < imgOut.width; x++) {
        for (y = 0; y < imgOut.height; y++) {
            var index = (x + y * imgOut.width) * 4;

            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            var distance = dist(x,y,imgOut.width/2,imgOut.height/2);
            var dynLum;
            if (distance <= 300) {
                dynLum = 1;
            } else if (distance < 450 && distance > 300) {
                dynLum = map(distance,300,450,1,0.4)
            } else {
                var diagnal = dist(0,0,imgOut.width/2,imgOut.height/2);
                dynLum = map(distance,450,diagnal,0.4,0);
            }
            imgOut.pixels[index+0] = r*dynLum;
            imgOut.pixels[index+1] = g*dynLum;
            imgOut.pixels[index+2] = b*dynLum;
            imgOut.pixels[index+3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}
// blur filter 
function radialBlurFilter(img){
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrix.length;

  imgOut.loadPixels();
  img.loadPixels();

  // read every pixel
  // achieve vignetting
  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;
          var r = img.pixels[index + 0];
          var g = img.pixels[index + 1];
          var b = img.pixels[index + 2];
          var c = convolution(x, y, matrix, matrixSize, img);
          var distance = dist(x,y,mouseX,mouseY);
          var dynBlur;
          //give a blur value based on distance to mouse pressed area
          if (distance<=100) {
              dynBlur = 0;
          } else if(distance<300 && distance>100) {
              dynBlur = constrain(map(distance, 100,300,0,1),0,1);
          } else {
              dynBlur = 1;
          }
          //output pixels after blur
          imgOut.pixels[index + 0] = c[0]*dynBlur + r*(1-dynBlur);
          imgOut.pixels[index + 1] = c[1]*dynBlur + g*(1-dynBlur);
          imgOut.pixels[index + 2] = c[2]*dynBlur + b*(1-dynBlur);
          imgOut.pixels[index + 3] = 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

function convolution(x, y, matrix, matrixSize, img) {
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);

    // convolution matrix loop
    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            // Get pixel loc within convolution matrix
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var index = (xloc + img.width * yloc) * 4;
            // ensure we don't address a pixel that doesn't exist
            index = constrain(index, 0, img.pixels.length - 1);

            // multiply all values with the mask and sum up
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    // return the new color
    return [totalRed, totalGreen, totalBlue];
}

function borderFilter(img) {
    // take an image img as an input 
    // create a local buffer called buffer of the same size as the input image
    var buffer = createGraphics(img.width, img.height);
    buffer.fill(255);
    buffer.rect(0,0,img.width, img.height);
    buffer.image(img,0,0);
    
    buffer.noFill();
    buffer.stroke(255);
    buffer.strokeWeight(50);
    buffer.rect(0,0,img.width, img.height,50);
    return buffer;
}
// another filter implemented
function extendedFilter(imgIn) {
    var resultImg = createImage(imgIn.width, imgIn.height);
    resultImg = greyscaleFilter(imgIn);
    return resultImg;
}
// grey filter
function greyscaleFilter(img){
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
      for (y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;

          var r = img.pixels[index + 0];
          var g = img.pixels[index + 1];
          var b = img.pixels[index + 2];

          var gray = (r + g + b) / 3; // simple
          // var gray = r * 0.299 + g * 0.587 + b * 0.114; // LUMA ratios 

          imgOut.pixels[index+0]= imgOut.pixels[index+1] = imgOut.pixels[index+2] = gray;
          imgOut.pixels[index+3]= 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}