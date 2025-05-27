let img;

function preload() {
    img = loadImage('./images/memory.jpg');
  console.log("??????"); 
}

function setup() {
  createCanvas(800, 600).parent('canvas-container');
  if (img) {
    image(img, 0, 0, width, height); 
    console.log("?????", img.width, "x", img.height);
  } else {
    console.error("???????");
  }
}

function draw() {}