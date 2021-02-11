var balloon,database;
var backgroundImg;
var position;
var BalloonImage;


function preload() {
  backgroundImg = loadImage("Hot Air Ballon-01.png");
}

function setup() {
  database = firebase.database();
  createCanvas(2000,800);
  balloon = createSprite(400, 200, 250, 250);
  BalloonImage = loadImage("Hot Air Ballon-02.png")
  balloon.addImage("balloon",BalloonImage)
  var Balloonposition = database.ref("balloon/position")
  Balloonposition.on("value",readPosition)
}

function draw() {
  background(backgroundImg);  

  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
}
else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
}

  drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/position').set(
  {
      'x' : position.x + x,
      'y' : position.y + y
  }
  )
  
}
function readPosition(data)
{
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
}