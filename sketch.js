var monkey, monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime=0, bananas=0;

function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  monkey = createSprite(80, 315);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.shapeColor=rgb(0,255,0);
  ground.velocityX=-10;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  createCanvas(400,400);
  background(0, 200, 255);
  
  if (ground.x<0) {
    ground.x=200;
  }
  
  if ((keyDown("space") || keyWentDown("space")) && monkey.y>305) {
    monkey.velocityY=-16;
  }
  
  monkey.velocityY++;
  
  monkey.collide(ground);
  
  newBanana();
  newObstacle();
  
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    bananas++;
  }

  survivalTime=Math.round(frameCount/getFrameRate());
  
  noStroke();
  fill(139,69,19);
  rect(0, 355, 400, 45);
  
  fill("black");
  textSize(15);
  text("Survival Time: "+survivalTime+" seconds", 120, 20);
  text("Bananas Collected: "+bananas, 135, 40);
  
  drawSprites();
}

function newBanana() {
  if (frameCount%80===0) {
    var banana = createSprite(400, Math.round(random(140,200)));
    banana.velocityX=-10;
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime=100;
    bananaGroup.add(banana);
  }
}

function newObstacle() {
  if (frameCount%300===0) {
    var obstacle = createSprite(400, 320);
    obstacle.velocityX=-8;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
  }
}