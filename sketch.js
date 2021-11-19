// https://www.youtube.com/watch?v=R1tfyVyU0hg

let w = 30; // width of our boxes
let h = 0; // height of our boxes, initially
let moon;
let bkg;

function preload() {
  moon = loadImage("moon.jpg");
}

function setup() {
  createCanvas(700, 700, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB);
  
  // if you copy any part of lines 18-25 and use it in your sketch I will expect you to be able to walk me through how this block of code works :) 
  bkg = createGraphics(width * 2, height * 2);
  bkg.background(0);
  for (let i = 0; i < 800; i++) {
    bkg.strokeWeight(random(1, 4));
    bkg.stroke(255);
    bkg.point(random(0, width * 2), random(0, height * 2));
  }
  noStroke();
}

function draw() {
  push();
  translate(- width,- height, -400)
  image(bkg, 0, 0);
  pop();
  
  let lx = cos(frameCount / 4) * 230;
  let lz = sin(frameCount / 4) * 230;
    
  pointLight(0, 0, 100, lx, -130, lz);
  ambientLight(0, 0, 4);

  // the moon  
  push();
  translate(0, -130, 0);
  rotateY(190);
  texture(moon);
  sphere(100);
  pop();
  
  // the pixelated ocean
  translate(-width/2, height/10, -350);
  rotateX(80);
  
  let start = frameCount / 400; // crucial for animation
  let incr = 0.15;
  
  // nested for loop
  let xoff = 0;
  for (let x = 0; x <= width; x += w) {
    let yoff = 0;
    for (let y = 0; y <= height; y += w) {
      let ceiling = 100;
      let h = map(noise(xoff + start, yoff + start), 0, 1, 0, ceiling);
      push();
      let c = map(h, 0, ceiling, 0, 60);
      fill(225, 80, c);
      translate(x, y, h/2);
      box(w, w, h);
      pop();
      yoff += incr;
    }
    xoff += incr / 2;
  }
}