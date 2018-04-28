// The Player class provides the core functions of the game

// establishes a new Player, with a given (x,y) position and radius
function Player(x, y, radius) {
  this.pos = createVector(x, y);
  this.radius = radius;
  this.vel = createVector(0,0);

// the updateVel function updates the Player's new velocity . . .
// by slowing the player down the bigger they get
  this.updateVel = function() {
    var newvel = createVector(mouseX-width/2, mouseY-height/2);
    newvel.setMag(2.5);
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel);
  }

// the playerEats function applies when the player comes in contact with another entity
  this.playerEats = function(other) {
    // variable d is the distance between the player and another entity
    var d = p5.Vector.dist(this.pos, other.pos);
    // when the total distance is less then both radii combined, then they are in contact
    if (d < this.radius + other.radius) {
      // sum and new radius equation given by Daniel Shiffman
      var sum = PI * this.radius * this.radius + PI * other.radius * other.radius;
      this.radius = sqrt(sum / PI);
      return true;
    } 
    else {
      return false;
    }
  }

// creates the "white food circles" within the sketch, 
// each with their own position and diameter
  this.showPlayers = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
  }

// creates the "red enemy cells" within the sketch,
// each with their own position and diameter
  this.showEnemy = function() {
    fill('darkred');
    ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
  }
}
