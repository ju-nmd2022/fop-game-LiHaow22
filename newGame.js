let player; // player
let platforms = []; // array of platforms
let gift; // image for platforms
let santa; // santa image
let broken; // broken present image
let score = 0; // score

// ------- Load images
function preload() {
  gift = loadImage("gift.png");
  santa = loadImage("santa.png");
  broken = loadImage("gift-broken.png");
}
// ------- Setup canvas
function setup() {
  createCanvas(500, 600);
  player = new Player();

  // ------- Create platforms
  for (let i = 0; i < 10; i++) {
    platforms.push(new Platform(random(width - 40), i * (height / 12)));
  }
  platforms.push(new Platform(245, 580)); // The first platform
}

function draw() {
  background(107, 159, 219); // Light blue
  player.update();
  player.show();
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].show(); // Show the platforms

    // Platform removal if it goes out of screen
    if (platforms[i].y > player.y + 400) {
      platforms.splice(i, 1); // Remove platform from array
      platforms.push(new Platform(random(width - 40), -50, false, true)); // Add a new platform at the top
    }
  }
  textSize(20);
  fill(0);
  text(`Score: ${score}`, 10, 30);

  checkKey();
}

function checkKey() {
  player.vx = 0;
  if (keyIsPressed) {
    if (keyCode == LEFT_ARROW) {
      player.vx = -5;
    }
    if (keyCode == RIGHT_ARROW) {
      player.vx = 5;
    }
  }
}

function randomBrokenLoop() {
  let randomBroken = Math.floor(Math.random() * 10);
  return randomBroken;
}
console.log(randomBrokenLoop());

class Platform {
  constructor(x, y, hasBeenLandedOn, isBroken) {
    this.h = 20;
    this.w = 40;
    this.x = x;
    this.y = y;
    this.hasBeenLandedOn = false; // Track if player has landed on this platform
    this.isBroken = random(1) < 0.33; //33% chance of breaking platforms
  }

  moveDown(y) {
    this.y -= y;
    if (this.y > height) {
      this.y = this.y - height - 50;
    }
  }

  show() {
    // Show platform image
    if (this.isBroken) {
      // Show a broken platform
      image(broken, this.x, this.y, this.w, this.h);
    } else {
      image(gift, this.x, this.y, this.w, this.h); // Normal platform image
    }
  }
}

class Player {
  constructor() {
    this.h = 30;
    this.w = 30;
    this.x = 250;
    this.y = height - this.h * 5;
    this.vx = 0;
    this.vy = 0;
    this.g = 0.1;
  }

  update() {
    if (this.y >= height + this.h) {
      background(255, 0, 0); // make the background red when losing
      noLoop(); // stop the draw loop
    }
    this.x += this.vx; // Move left or right
    if (this.vy < 0 && this.y > 150) {
      this.vy += this.g; // add gravity
      this.y += this.vy; // add the velocity y to the y location
    } else if (this.vy < 0) {
      this.vy += this.g;
      for (let i = 0; i < platforms.length; i++) {
        platforms[i].moveDown(this.vy); // move the platforms down
      }
    } else {
      // Check if has been landed on
      const collidedPlatform = this.collision();
      if (collidedPlatform) {
        if (!collidedPlatform.hasBeenLandedOn) {
          // Mark platform as landed on
          collidedPlatform.hasBeenLandedOn = true;
          this.vy = 0; // Stop falling
          this.jump(); // Make the player jump again
          score++; // Increase score
          console.log(`inte landad: ${score}`);
        } else {
          this.vy = 0;
          this.jump();
        }
        if (collidedPlatform.isBroken) {
          // Remove the platform if it's broken
          const index = platforms.indexOf(collidedPlatform);
          platforms.splice(index, 1);
        }
      } else {
        this.vy += this.g; // Keep falling if no collision
        this.y += this.vy;
      }
    }

    // wrap left and right sides
    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
  }

  collision() {
    // Check for collision with platforms
    for (let i = 0; i < platforms.length; i++) {
      if (
        abs(this.y + this.h - platforms[i].y) < 5 &&
        ((this.x < platforms[i].x + platforms[i].w &&
          this.x > platforms[i].x) ||
          (this.x + this.w < platforms[i].x + platforms[i].w &&
            this.x + this.w > platforms[i].x))
      ) {
        return platforms[i]; // Return the platform
      }
    }
    return null; // No collision
  }

  jump() {
    this.vy -= 7;
  }

  show() {
    image(santa, this.x, this.y, this.w, this.h); // Draw the player (Santa image)
  }
}
