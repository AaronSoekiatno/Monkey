//Global Variables
var monkey, monkey_running;
var back, backImg;
var ground, groundImg;

var foodImg, foodGroup;
var obsImg, obsGroup;
var banana, obs;
var score;

function preload(){
  backImg = loadImage("jungle.jpg"); 
  
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png","Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  groundImg = loadImage("ground.jpg");
  
  foodImg = loadImage("Banana.png");
  obsImg = loadImage("stone.png");
  
}


function setup() {
  createCanvas(600,300);
  
  back = createSprite(100,10,600,300);
  back.addImage(backImg);
  back.scale = 1.5;
  back.x = back.width/2;
  back.velocityX = -4;
 
  monkey = createSprite(100,270,400,50);
  monkey.addAnimation("Run",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,850,800,10);
  ground.addImage(groundImg);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  foodGroup = new Group();
  obsGroup = new Group();
  
  score = 0;
}

function draw(){
  background(255); 

    if(ground.x < 0){
      ground.x = ground.width/2;
    }
      
    if(back.x < 0){
    back.x = back.width/2; 
  }
  
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score + 2;
       }
      
    switch(score){
        case 10: monkey.scale = 0.12;
          break;
        case 20: monkey.scale = 0.14;
          break;
        case 30:monkey.scale = 0.16;
          break;
        case 40: monkey.scale = 0.18;
          break;
        case 50: monkey.scale = 0.2;
          break; 
        default: break;
    }
  
    if(keyDown("space") && monkey.y >= 265){
      monkey.velocityY = -14;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
  
    if(obsGroup.isTouching(monkey)){
       monkey.scale = 0.08;
       score = score-2;
       }
    
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 250,50);
}

function spawnFood(){
  if(frameCount%100 === 0){
  banana = createSprite(600,250,10,10);
  banana.addImage(foodImg);
  banana.y = random(120,200);
  banana.scale = 0.05
  banana.velocityX = -5;
  banana.lifetime = 300;
    
  foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%250 === 0){
    obs = createSprite(600,260,10,10);
    obs.velocityX = -6;
    obs.addImage(obsImg);
    obs.scale = 0.2;
    obs.lifetime = 300;
    obsGroup.add(obs);    
  }
}