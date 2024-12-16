let game;
let santaX = 10;
let santaY = 10;

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
  rect(santaX + 10, santaY + 10, santaX + 20, santaY);
  rect(santaX, santaY + 20, santaX + 20, santaY + 50);

  fill(223, 203, 165); // Beige
  rect(santaX, santaY + 30, santaX + 20, santaY);

  fill(255); // White
  rect(santaX, santaY + 40, santaX + 20, santaY);
  rect(santaX + 40, santaY + 20, santaX, santaY);

  fill(0, 21, 20); // Black
  rect(santaX, santaY + 50, santaX + 20, santaY);

  fill(243, 182, 31); // Yellow
  rect(santaX + 10, santaY + 50, santaX, santaY);
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
