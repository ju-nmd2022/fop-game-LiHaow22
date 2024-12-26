// Source List:

// Game states: https://editor.p5js.org/mbardin/sketches/lSYhg5Xr Retrieved: 16-12/2024
// Classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes Retrieved 16-12/2024
// Arrays: https://www.youtube.com/watch?v=LO3Awjn_gyU (videos 7.1-7.5 in series) Retrieved between 16-12/2024 and 21-12/2024
// Condition statements: https://pixelkind.github.io/foundationsofprogramming//programming/10-01-conditions Retrieved: 17-12/2024
// Arrow keys to move: https://stackoverflow.com/questions/69353809/is-there-a-way-to-continuously-move-an-object-in-p5-via-user-input Retrieved 17-12/2024
// Screen Wrapping: https://www.youtube.com/watch?v=LO3Awjn_gyU Retrieved: 17-12/2024
// Constructor: https://www.youtube.com/watch?v=rHiSsgFRgx4 Retrieved: 18-12/2024
// Core: https://codeheir.com/2021/03/13/how-to-code-doodle-jump/ Retrieved: 18-12/2024
// Math random: https://www.w3schools.com/js/js_random.asp Retrieved: 18-12/2024
// Core: https://www.youtube.com/watch?v=CyAOEisE8_k Retrieved: 19-12/2024
// Core: https://editor.p5js.org/lavastudios08/sketches/tBAUlxt5U Retrieved: 19-12/2024
// Collision: https://editor.p5js.org/ehagan/sketches/_MWWTnpBt Retrieved: 19-12/2024
// Core: https://www.youtube.com/watch?v=LpIZmfGXXRM Retrieved: 19-12/2024
// Collision: https://discussions.unity.com/t/increase-score-value-by-1-when-collision-triggered-not-working-for-me/887521 Retrieved: 19-12/2024
// Breaking platforms: https://chatgpt.com/share/67671d03-b448-8011-a8ba-496ae0b6f424 REtrieved 19-12/2024
// Moving Platforms: https://chatgpt.com/share/67653e9a-e7c0-8011-82b2-5aec3ba875b3 Retrieved 20-12/2024
// Centered Canvas: https://github.com/processing/p5.js/wiki/Positioning-your-canvas Retrieved: 22/12-2024
// Correct restarting/resetting: https://forum.freecodecamp.org/t/restart-game-to-initial-parameters/501094/4 Retrieved: 25/12-2024
// Code has also been worked on together with Thomas Halvarsson between 18-12/2024 and 26-12/2024

let player; // player
let platforms = []; // array of platforms
let gift; // image for platforms
let santa; // santa image
let broken; // broken present image
let score = 0; // score
let gameState = "Start"; // game states to control the different screens

// ------- Load images
function preload() {
  gift = loadImage("gift.png");
  santa = loadImage("santa.png");
  broken = loadImage("gift-broken.png");
}

// ------- Setup canvas
function setup() {
  createCanvas(500, 600);
  player = new Player(); // create the player (santa)

  // ------- Create first 10 + 1 platforms
  for (let i = 0; i < 10; i++) {
    platforms.push(
      new Platform(random(width - 40), i * (height / 12), false, random() < 0.3) //random assigns how often the moving platforms should spawn
    );
  }
  platforms.push(new Platform(245, 580, false, false)); // The first platform that is always centered at bottom
}
// ------- Draws the platforms and player, and updates game state
function draw() {
  background(206, 234, 247); // Light blue

  // ------- Game state start
  if (gameState === "Play") {
    player.update();
    player.show();
    for (let i = 0; i < platforms.length; i++) {
      // From 0 to amount of platforms loop through array of platforms and update them
      platforms[i].update(); // Update platform positions
      platforms[i].show(); // Show the platforms

      // Platform removal if it goes out of screen
      if (platforms[i].y > player.y + 400) {
        // If the current platform's position is smaller than player position (if the difference is more than 400, then remove plaform)
        platforms.splice(i, 1); // Remove platform from array
        platforms.push(
          // New platform added at the top when one is removed from the bottom
          new Platform(random(width - 40), -10, false, random() < 0.3) // Random assigns how often the moving platforms should spawn (above the initial screen)
        );
      }
      if (platforms.length <= 10) {
        // console.log("add new platform");
        platforms.push(
          // Add new platform if less than 10 platforms on screen
          new Platform(random(width - 40), -10, false, random() < 0.3) // Random assigns how often the moving platforms should spawn (above the initial screen)
        );
      }
    }
    textSize(20);
    fill(34, 155, 211); // Middle blue
    text(`Score: ${score}`, 50, 30); // Print score on top to the left of the screen
  }
  if (gameState === "Start") {
    fill(34, 155, 211); // Middle blue
    textAlign(CENTER);
    textSize(32);
    text("Santa's Gift Jump", width / 2, height / 3);
    textSize(16);
    text("Use the <  > keys to move", width / 2, height / 2.5);
    fill(26, 116, 158); // Dark blue
    text("Press 'Space' to start the game", width / 2, height / 1.8);
    pressStart(); // If space is pressed then switch to play screen
  }
  if (gameState === "End") {
    background(26, 116, 158); // Dark blue
    fill(206, 234, 247); // Light blue
    textAlign(CENTER);
    textSize(32);
    text("Game over", width / 2, height / 3);
    textSize(16);
    text("Press 'Enter' to restart the game", width / 2, height / 1.8);
    fill(132, 202, 235); // Middle blue
    text(`Your score: ${score}`, width / 2, height / 2);
    pressRestart(); // If enter is pressed then switch to start screen
    //console.log("stop");
  }

  checkKey(); // Checks for right and left arrows to move player
}

// ------- Start the game by pressing spacebar
function pressStart() {
  if (keyIsPressed) {
    if (keyCode == 32) {
      // space key is pressed
      gameState = "Play";
      //console.log("start");
    }
  }
}

// ------- Restart the game by pressing enter
function pressRestart() {
  if (keyIsPressed) {
    if (keyCode == 13) {
      // Enter key is pressed
      // Below resets all stats to be able to start over
      gameState = "Start";
      score = 0;
      player = new Player();
      platforms = [];
      //console.log("restart");

      // Recreate platforms
      for (let i = 0; i < 10; i++) {
        platforms.push(
          new Platform(
            random(width - 40),
            i * (height / 12),
            false,
            random() < 0.3
          )
        );
      }
      platforms.push(new Platform(245, 580, false, false)); // First platform
    }
    loop();
  }
}

// ------- Move player side to side
function checkKey() {
  player.vx = 0;
  if (keyIsPressed) {
    if (keyCode == LEFT_ARROW) {
      player.vx = -5; // Velocity to left
    }
    if (keyCode == RIGHT_ARROW) {
      player.vx = 5; // Velocity to right
    }
  }
}

// ------- Class with template for the platforms
class Platform {
  constructor(x, y, hasBeenLandedOn, isMoving) {
    this.h = 20;
    this.w = 40;
    this.x = x; // Position
    this.y = y; // Position
    this.vx = 1; // Speed of horizontal movement
    this.hasBeenLandedOn = hasBeenLandedOn || false; // Track if player has landed on this platform (|| means OR)
    this.isBroken = random(1) < 0.3; // 30% chance of breaking platforms
    this.isMoving = isMoving || false; // Whether this platform moves
    this.direction = 1; // Platform direction, 1 for right, -1 for left
    this.range = 50; // Movement range in pixels
    this.originX = x; // Original position for range calculations
  }

  // ------- Moves screen down to give impression of going up
  moveDown(y) {
    this.y -= y;
    if (this.y > height) {
      this.y = this.y - height - 50;
    }
  }

  // ------- Update position if moving
  update() {
    if (this.isMoving) {
      // Moves the platform horizontally if it is set to move, changing direction when reaching its range
      this.x += this.vx * this.direction;

      // Reverse direction if out of range
      if (
        this.x > this.originX + this.range ||
        this.x < this.originX - this.range
      ) {
        this.direction *= -1;
      }
    }
  }

  // ------- Show platform image
  show() {
    if (this.isBroken) {
      // Show a broken platform image
      image(broken, this.x, this.y, this.w, this.h);
    } else {
      image(gift, this.x, this.y, this.w, this.h); // Normal platform image
    }
  }
}

// ------- Class with template for the player
class Player {
  constructor() {
    this.h = 30; // Player dimension
    this.w = 30; // Player dimension
    this.x = 250; // Start position for player
    this.y = height - this.h * 5; // Start position for player
    this.vx = 0; // Speed of player
    this.vy = 0; // Speed of player
    this.g = 0.08; // Gravity
  }

  // ------- Update player position
  update() {
    if (this.y >= height + this.h) {
      gameState = "End"; // When losing the game set to end screen
    }
    this.x += this.vx; // Move left or right
    if (this.vy < 0 && this.y > 150) {
      this.vy += this.g; // Add gravity
      this.y += this.vy; // Add the velocity y to the y location
    } else if (this.vy < 0) {
      this.vy += this.g;
      for (let i = 0; i < platforms.length; i++) {
        // Loop through all platforms and move them down
        platforms[i].moveDown(this.vy); // Move the platforms down
      }
    } else {
      // Check if has been landed on
      const collidedPlatform = this.collision();
      if (collidedPlatform) {
        if (!collidedPlatform.hasBeenLandedOn) {
          // ! = NOT landed on before
          collidedPlatform.hasBeenLandedOn = true; // Mark platform as landed on
          this.vy = 0; // Stop falling
          this.jump(); // Make the player jump again
          score++; // Increase score
        } else {
          // Has been landed on before
          this.vy = 0;
          this.jump();
        }
        if (collidedPlatform.isBroken) {
          // Remove the platform if it's broken (if it's been landed on)
          const index = platforms.indexOf(collidedPlatform);
          platforms.splice(index, 1);
        }
      } else {
        this.vy += this.g; // Keep falling if not landed on any platform
        this.y += this.vy;
      }
    }

    // Wrap left and right sides
    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
  }

  // ------- Jumping on platforms
  collision() {
    for (let i = 0; i < platforms.length; i++) {
      // Check for collision with platforms
      if (
        abs(this.y + this.h - platforms[i].y) < 5 && // Only detect collision if landing from above (player bottom hits platform top) ABS = only return positive value
        ((this.x < platforms[i].x + platforms[i].w &&
          this.x > platforms[i].x) ||
          (this.x + this.w < platforms[i].x + platforms[i].w &&
            this.x + this.w > platforms[i].x))
      ) {
        return platforms[i]; // Return the platform number so we can check if it's broken or not so it can be removed if landed on
      }
    }
    return null; // No collision means we not platforms disappear (except from the ones going out of screen)
  }

  jump() {
    this.vy -= 5; // Jumps up with a speed of 5
  }

  show() {
    image(santa, this.x, this.y, this.w, this.h); // Draw the player (Santa image)
  }
}
