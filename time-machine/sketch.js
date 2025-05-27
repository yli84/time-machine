let memoryImg, noiseImg;
let fade = 0;

function preload() {
  memoryImg = loadImage('./images/memory.jpg');
  noiseImg = loadImage('./images/noise.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(0);
  
  tint(255, 255 - fade);
  image(memoryImg, width/2, height/2, 
       min(width, memoryImg.width), 
       min(height, memoryImg.height));
  
  tint(255, fade);
  image(noiseImg, width/2, height/2, width, height);
  
  if (fade < 255) fade += 0.5;
}

function mouseMoved() {
  fade += map(mouseX, 0, width, -3, 3);
  fade = constrain(fade, 0, 255); 
}