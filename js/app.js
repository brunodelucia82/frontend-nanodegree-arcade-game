'use strict';

// Enemies our player must avoid
let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getX();
    this.y = getY();
    this.speed = Math.random() * 250 + 250;
    this.outerRect;
};

/*
 * The starting x coordinate is a random number between 
 * not greater than 0, this ensures enemies appear from 
 * the left hand side at different times
 */
function getX() {
    return 0 - Math.random() * 500;
};

/*
 * The starting y coordinate is a random number, its 
 * lower and upper bounds are chosen to ensure the enemy
 * will always run on the canvas' road portion
 */
function getY() {
    return 55 + Math.random() * 185;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;
    if (this.x > 505) { // when the enemy exits through the right 
        // hand border of the canvas, we'll give it new x and y 
        // coordinates to make it reappear from the left hand side
        this.x = getX();
        this.y = getY();        
    };
    // update the enemy's outer rectangle
    this.outerRect = {
        topLeft: {
            x: this.x + 1,
            y: this.y + 78
        },
        width: 100,
        height: 64
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 * Checks whether a collision is occurring between this enemy
 * and the player, returning either true or false
 */
Enemy.prototype.collisionWithPlayer = function(plr) {
    let thisBottomRight = {
        x: this.outerRect.topLeft.x + this.outerRect.width,
        y: this.outerRect.topLeft.y + this.outerRect.height
    }
    if (plr.constructor.name === 'Player') { // if plr is actually an instance of Player
        // and there's vertical overlapping
        if (plr.outerRect.topLeft.x > this.outerRect.topLeft.x && plr.outerRect.topLeft.x < thisBottomRight.x) {
            let plrBottomRight = {
                x: plr.outerRect.topLeft.x + plr.outerRect.width,
                y: plr.outerRect.topLeft.y + plr.outerRect.height
            }
            // and there's horizontal overlapping
            if ((plr.outerRect.topLeft.y >= this.outerRect.topLeft.y && plr.outerRect.topLeft.y <= thisBottomRight.y) ||
                (plrBottomRight.y >= this.outerRect.topLeft.y && plrBottomRight.y <= thisBottomRight.y) || 
                (plr.outerRect.topLeft.y <= this.outerRect.topLeft.y && plrBottomRight.y >= thisBottomRight.y)) {
                return true; // then we're having a collision
            }
        }
    }
    return false; // otherwise we're not having any collision
}

// Now write your own player class
let Player = function() {
    this.startX = 202;
    this.startY = 384.5;
    this.x = this.startX;
    this.y = this.startY;
    this.sprite = 'images/char-boy.png';
    this.strideX = 101;
    this.strideY = 81;
    this.outerRect;
    this.score = 0; // amount of successful street crossings
    this.streak = 0; // amount of consecutive street crossings 
        // since last collision with an enemy
    this.deaths = 0; // amount of collisions with enemies
};
// This class requires an update(), render() and
Player.prototype.update = function() {
    // update the player's outer rectangle
    this.outerRect = {
        topLeft: {
            x: this.x + 18,
            y: this.y + 64
        },
        width: 100,
        height: 76
    };
    // checks whether the player reached the water, in that 
    // case the player gets back to the starting position 
    // and the score is incremented by one
    if (this.checkVictory()) {
        this.score++;
        this.streak++;
        this.x = this.startX;
        this.y = this.startY;
    }
    // check for collisions with the enemies, if a collision
    // occurs the player is sent back to the starting position
    for (let i = 0; i < allEnemies.length; i++) {
        let enemy = allEnemies[i];
        if (enemy.collisionWithPlayer(this)) {
            this.deaths++;
            this.streak = 0;
            this.x = this.startX;
            this.y = this.startY;
        }
    };
    refreshInfoPanel();
};

function refreshInfoPanel() {
    document.getElementById('score').innerText = player.score;
    document.getElementById('streak').innerText = player.streak;
    document.getElementById('deaths').innerText = player.deaths;
}

/*
 * Returns true when the player has reached the top of the canvas,
 * otherwise returns false
 */
Player.prototype.checkVictory = function() {
    return (this.y === this.startY - 5 * this.strideY);
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 * Handles the keyboard input by changing the player's x and y 
 * coordinates accordingly. Current position checks make sure
 * that the player can never wander off the canvas 
 */
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > this.startX - 2 * this.strideX ) {
        this.x -= this.strideX;
        return;
    }
    if (direction === 'right' && this.x < this.startX + 2 * this.strideX ) {
        this.x += this.strideX;
        return;
    }
    if (direction === 'up' && this.y > this.startY - 5 * this.strideY ) {
        this.y -= this.strideY;
        return;
    }
    if (direction === 'down' && this.y < this.startY ) {
        this.y += this.strideY;
        return;
    }
};
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
];
// Place the player object in a variable called player
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
