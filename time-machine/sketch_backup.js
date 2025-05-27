let img, noiseImg;
let fadeValue = 0;
let isReversing = false;
let particles = [];

function preload() {
  img = loadImage('images/memory.jpg');
  noiseImg = loadImage('images/noise.png');
}

function setup() {
  createCanvas(800, 600).parent('canvas-container');
  imageMode(CENTER);
  for (let i = 0; i < 500; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(1, 5),
      speed: random(0.2, 1),
      angle: random(TWO_PI)
    });
  }
}

function draw() {
  background(0);
  tint(255, 255 - fadeValue * 2.55);
  image(img, width/2, height/2, 800, 600);
  
  blendMode(OVERLAY);
  tint(255, fadeValue * 0.5);
  image(noiseImg, width/2, height/2, 800, 600);
  blendMode(NORMAL);
  
  if (fadeValue > 30) {
    for (let p of particles) {
      fill(255, map(fadeValue, 30, 100, 0, 255));
      noStroke();
      circle(p.x, p.y, p.size);
      p.x += cos(p.angle) * p.speed;
      p.y += sin(p.angle) * p.speed;
      if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
        p.x = random(width);
        p.y = random(height);
      }
    }
  }
  
  if (!isReversing && fadeValue < 100) fadeValue += 0.1;
  else if (isReversing && fadeValue > 0) fadeValue -= 0.3;
  
  fill(255, 150);
  noStroke();
  textSize(14);
  textAlign(CENTER);
  text("? ???????? ? ????????", width/2, height - 30);
}

function mouseMoved() {
  if (mouseX < width/3) {
    isReversing = false;
    fadeValue += 2;
  } else if (mouseX > width*2/3) {
    isReversing = true;
  }
}