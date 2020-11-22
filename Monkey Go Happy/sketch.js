var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided = loadAnimation("sprite_3.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(60,385);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.12
  
  ground = createSprite(0,425,1000,15); 
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
  bananaGroup = createGroup();  
  obstacleGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.hieght);
  monkey.debug = false;
  
  survivalTime = 0;
  score = 0;
  
}


function draw() {
  background("white");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black")
  textSize(20);
  fill("black");
  text("Surviaval Time: "+ survivalTime,150,50);

  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  if(keyDown("space") && monkey.y>= 100){
    monkey.velocityY = -10; 
  }
  
  monkey.velocityY = monkey.velocityY + 0.6;
  
  if(ground.x<0) {
    ground.x = ground.width / 2;
  }
  
  if (obstacleGroup.isTouching(monkey)){
  
    ground.velocityX = 0;
    
    monkey.changeAnimation("collided",monkey_collided);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
 }
  
  monkey.collide(ground);

  bananas();
  obstacles();
  
  drawSprites();
}

function bananas(){
  if (frameCount % 80 === 0){
    
    banana = createSprite(600,250,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200));
    banana.lifetime = 300;
    banana.velocityX=-4;
    bananaGroup.add(banana);
  }
} 

function obstacles(){
   if(frameCount % 300 === 0){ 
     
     obstacle = createSprite(800,380,10,10)
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.2;
     obstacle.lifeTime = 300;
     obstacle.velocityX=-4;
     obstacleGroup.add(obstacle);
   }
 } 