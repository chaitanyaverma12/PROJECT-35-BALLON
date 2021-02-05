var balloonImg, balloon,bgImg,bg;
var position, database;

function preload(){
  bgImg = loadImage("HotAirBallon-01.png");
  balloonImg = loadImage("HotAirBallon-02.png");
}

function setup(){
    database = firebase.database();
    createCanvas(500,500);
   
    balloon = createSprite( 250,600,10,10);
    100,140,20,20
    balloon.addImage(balloonImg);
    balloon.scale=0.4;

    var ballPosition = database.ref('balloon/position');
    ballPosition.on("value",readPosition,showError);
}

function draw(){
    background(bgImg);  
  background.velocityX = -3;
  if(background.x < 0){
    background.x = background.width/2;
  }
    

    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-10,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(10,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-10);
            balloon.scale -= 0.005;
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+10);
            balloon.scale += 0.005;
        }
    
    drawSprites();
    }
}

function writePosition(x,y){
    database.ref("balloon/position").set(
        { 
            'x':balloon.x+x,
            'y':balloon.y+y
        }
    )
}
function readPosition(data){
    position = data.val();
    console.log(position);
    balloon.x=position.x;
    balloon.y=position.y;
}
function showError(){
    console.log("error");    
}
