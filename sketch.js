var player;
var players = [];
var enemies = [];
var zoom = 1;

// Setup creates the html canvas sketch
function setup() {
  createCanvas(windowWidth, windowHeight);
  // creates you, the Player, starting at the origin w/ a radius of 20
  player = new Player(0, 0, 20);
  // creates 85 "food cells" with random coordinates and a radius of 15
  for (var i = 0; i <= 85; i++) {
    var x = random(-width,width);
    var y = random(-height,height);
    players[i] = new Player(x, y, 15);
  }
  // creates 30 "enemy cells" with random coordinates and a radius of 75
  for (var j = 0; j <= 30; j++) {
    var x = random(-width,width);
    var y = random(-height,height);
    enemies[j] = new Player(x, y, 75);
  }
}

// resizes the canvas as you adjust your window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// the draw function essentially ties everything together and paints the canvas from the setup function
function draw() {
  background('steelblue');
  // translates the window to stay in the POV of the Player given by Daniel Shiffman
  translate(width/2, height/2);
  var newzoom = 64 / player.radius;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-player.pos.x, -player.pos.y);

  // creates the other players onto the screen and encorporates the eat function to kill the other players
  for (var i = players.length-1; i>=0; i--) {
    players[i].showPlayers();
    if (player.playerEats(players[i])) {
      players.splice(i, 1);
    }
  }

  // creates the enemies onto the screen and encorporates the eat function to kill the player
  for (var j = enemies.length-1; j>=0; j--) {
    enemies[j].showEnemy();
    if (enemies[j].playerEats(player)) {
      player.splice(0, 1);
    }
  }
  // displayes the Player onto the screen and updates its Velocity as it eats other players
  player.showPlayers();
  player.updateVel();

}
