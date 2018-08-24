// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getX();
    this.y = getY();
    this.speed = Math.random() * 250 + 250;
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
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    
};
// This class requires an update(), render() and
Player.prototype.update = function() {
    
};

Player.prototype.render = function() {
    
};

Player.prototype.handleInput = function() {
    
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
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
