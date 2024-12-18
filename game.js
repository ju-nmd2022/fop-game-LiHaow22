let game;

const gravity = 0.33;
const drag = 0.3;
const bounceVelocity = -12.5;

// Create the game
function setup() {
  createCanvas(600, 600);
  game = new Game();
}

// Display the current game state + background
function draw() {
  background(107, 159, 219); // Light blue
  game.display();
}

// Santa Character
function drawSanta() {
  noStroke();
  fill(238, 60, 47); // Red
  rect(20, 20, 30, 10);
  rect(10, 30, 30, 60);

  fill(223, 203, 165); // Beige
  rect(10, 40, 30, 10);

  fill(255); // White
  rect(50, 30, 10, 10);

  fill(0, 21, 20); // Black
  rect(10, 60, 30, 10);

  fill(243, 182, 31); // Yellow
  rect(20, 60, 10, 10);
}

class Game {
  constructor() {
    this.init();
  }

  // Initialize/reset the game (when restarting)
  init() {
    this.state = "start";
    this.score = 0;
    this.santa = { x: 300, y: 500 };
    this.platforms = [];
  }

  // Display the current game state
  display() {
    if (this.state === "start") {
      this.displayStartScreen();
    } else if (this.state === "play") {
      this.playGame();
    } else if (this.state === "end") {
      this.displayEndScreen();
    }
  }

  // Start screen
  displayStartScreen() {
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("Santa's Gift Jump", width / 2, height / 3);
    textSize(16);
    text("Use the <  > keys to move", width / 2, height / 2.5);
    text("Click the button to start", width / 2, height / 1.8);

    // Start button
    fill(157, 222, 125);
    rect(width / 2 - 50, height / 1.7 + 5, 100, 40);
    fill(57, 114, 29);
    noStroke();
    text("START", width / 2, height / 1.6 + 4);
  }

  // Play (placeholder)
  playGame() {
    background(0); // Black background for now
    this.updateGameLogic();
    this.displayGameElements();
  }

  // Update (score, platforms)
  updateGameLogic() {
    this.score++; // for now
  }

  // Game elements
  displayGameElements() {
    fill(255);
    textSize(16);
    text(`Score: ${this.score}`, 50, 30);
    drawSanta();
  }

  // End screen
  displayEndScreen() {
    background(150);
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("Game over", width / 2, height / 3);
    textSize(16);
    text(`Your score: ${this.score}`, width / 2, height / 2);
    text("Click to start over", width / 2, height / 1.8);
  }

  // Handle mouse interaction to transition between states
  mousePressed() {
    if (this.state === "start") {
      this.state = "play";
    } else if (this.state === "play") {
      this.state = "end";
    } else if (this.state === "end") {
      this.init();
    }
  }
}

// Listen for interaction
function mousePressed() {
  game.mousePressed();
}
