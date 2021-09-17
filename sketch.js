var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score=0;

var trex;
var ground, ground1, ground2, ground3, ground4;
var line;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var gameOverImg,restartImg

function preload(){
 trexImg = loadAnimation("trex1.png","trex3.png","trex4.png")
 backgroundImg = loadImage("background1.png")
 groundImage = loadImage("jjjkkkk.png");
 groundImg = loadImage("jjjkkkk.png");
 jumpSound = loadSound("jump.mp3");
 overSound = loadSound("die.mp3");
 obstacle1 = loadImage("1.png");
 obstacle2 = loadImage("2.png");
 obstacle3 = loadImage("3.png");
 obstacle4 = loadImage("4.png");

 trex_collided = loadAnimation("collide.png")

 trex_Fly = loadAnimation("fly1.png")

 restartImg = loadImage("restart.png")
 gameOverImg = loadImage("gameOver.png")

}

function setup() {
  createCanvas(1000, 400);
  
  trex = createSprite(100,320);
  trex.addAnimation("running",trexImg);
  trex.addAnimation("collided",trex_collided);
  trex.addAnimation("flying",trex_Fly);
  trex.scale=0.5;

  ground = createSprite(200,375,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  line = createSprite(500,360,1000,2);
  line.visible=false;

  ground1 = createSprite(600,375,800,20);
  ground1.addImage("ground",groundImg);
  ground1.x = ground1.width /2;

  ground2 = createSprite(600,375,800,20);
  ground2.addImage("ground",groundImg);
  ground2.x = ground2.width /2;

  ground3 = createSprite(700,375,1000,20);
  ground3.addImage("ground",groundImg);

  ground4 = createSprite(600,375,1000,20);
  ground4.addImage("ground",groundImg);

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  obstaclesGroup = createGroup();
  obstaclesdGroup = createGroup();
  kksdGroup = createGroup();
  hhfjGroup = createGroup();

  trex.setCollider("rectangle",0,0,100,170);
  trex.debug = false;

  score = 0;

}

function draw() {
  background(backgroundImg);
 
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  

  if(gameState === PLAY){

    score = score + Math.round(getFrameRate()/60);

    gameOver.visible = false
    restart.visible = false

//jump when the space key is pressed
if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-150) {
  jumpSound.play( )
  trex.velocityY = -10;
  touches = [];

 trex.changeAnimation("flying",trex_Fly);
}
//add gravity
trex.velocityY = trex.velocityY + 0.8

if(trex.isTouching(line)) {
 trex.changeAnimation("running",trexImg);
}

  ground.velocityX = -4
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    ground1.velocityX = -3
    if (ground1.x < 0){
      ground1.x = ground1.width/2;
    }
    ground2.velocityX = -1
    if (ground2.x < 0){
      ground2.x = ground2.width/2;
    }

    spawnObstacles();

    if(trex.isTouching(obstaclesGroup)){
      gameState=END
      overSound.play();
    }
    
  }
  else if (gameState === END) {
  
    gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      ground1.velocityX = 0;
      ground2.velocityX = 0;
      trex.velocityY = 0
     
      //change the trex animation

      trex.changeAnimation("collided", trex_collided);
      trex.scale= 0.3;
      trex.x=100;
      trex.y=290;

      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
     obstaclesGroup.destroyEach();

     if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }


  }



    //stop trex from falling down
  trex.collide(line);

  
  drawSprites();
}



 function spawnObstacles(){
  if (frameCount % 40 === 0){
    var obstacle = createSprite(800,310,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
     //generate random obstacles
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
       default: break;
     }
    obstacle.setCollider("rectangle",0,0,150,170);
    obstacle.debug = false;
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.2;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
 }

 function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  trex.scale=0.5;
  
  obstaclesGroup.destroyEach();

  score = 0;
}