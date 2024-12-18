let player;
let presents; //platforms
let bgImage; //background image
let bgImageY = 0; // location of background
let gift; //image of presents/platforms
let santa; //image of player (santa)

function preload() {
  gift = loadImage("gift.png");
  santa = loadImage("santa.png");
}

function setup() {
  createCanvas(600, 600);
  player = new Player();
}

function draw() {
  background(107, 159, 219); // Light blue
  player.update();
  player.show();
  for (let i = 0; i < presents.length; i++) {
    presents[i].show();
  }
  checkKey();
}

function checkKey() {
  if (keyIsPressed) {
    if (keyCode == LEFT_ARROW) {
      player.vx -= 0.3;
    }
    if (keyCode == RIGHT_ARROW) {
      player.vx += 0.3;
    }
  }
}

class Presents {}

class Player {
  constructor() {
    this.height = 50;
    this.width = 50;
    this.x = width / 2 - 15;
    this.y = height - this.height * 5;
  }
  show() {
    image(santa, this.x, this.y, this.width, this.height);
  }
}
