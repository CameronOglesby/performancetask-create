var player;
var players = [];
var zoom = 1;
var img;

function preload() {
  img = loadImage("libraries/images/background.jpg");
}

function setup() {
  createCanvas(3888, 2592);
  player = new Player(0, 0, 20);
  for (var i = 0; i < 85; i++) {
    var x = random(-width,width);
    var y = random(-height,height);
    players[i] = new Player(x, y, 16);
  }
}

//function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
//}

function draw() {
  background(img);

  translate(width/2, height/2);
  var newzoom = 64 / player.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-player.pos.x, -player.pos.y);

  for (var i = players.length-1; i >=0; i--) {
    players[i].show();
    if (player.eats(players[i])) {
      players.splice(i, 1);
    }
  }


  player.show();
  player.update();

}
