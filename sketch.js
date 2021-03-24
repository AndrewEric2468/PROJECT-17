
var monkey , monkey_running;
var fruit ,bananaImage, enemy, obstacleImage;

var stopImg;
var fGrp, eGrp;
var ground, invisible;
var score;
var count;

var PLAY =1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(600,600);
  
  fGrp = new Group();
  eGrp = new Group();
  
  monkey = createSprite(50,530,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.14;
  
  ground = createSprite(300,580,1200,20);
  ground.shapeColor = "brown";
  ground.x = ground.width/2;
  
  invisible = createSprite(300,575,600,10);
  invisible.visible = false;
  
  monkey.setCollider("circle",0,0,300)
 // monkey.debug = true;
  
  score = 0;count = 0;
}


function draw() {
  background("lightgreen");
  
  stroke("black");
  textSize(20);
  fill("white");
   
  text("Survival Time: "+score , 250,100);
   text("Banana Count:"+count, 260, 130)
  
  
  if(gameState === PLAY){
    
    score = Math.ceil(frameCount/frameRate())
    
    // add velocity to ground
  ground.velocityX = -6;
  
  if(ground.x <0 ){
     ground.x = ground.width/2;
  }
  
  
  //console.log(monkey.y)
  //monkey to jump
  if(keyDown("space") && monkey.y>= 480){
    monkey.velocityY = -12;
  }
  //add gravity
 
  
  fruits();
  stones();
    
    if(fGrp.isTouching(monkey)){
      count += 1;
      fGrp.destroyEach();
    }
    if(eGrp.isTouching(monkey)){
      gameState = END;
      
    }
  }
  else if(gameState === END){
    monkey.velocityY = 0;
    ground.velocityX = 0;
    
    
    stroke("black");
    textSize(40);
    fill("red");
    text("Game Over!!",200,250);
    
    eGrp.destroyEach();
    fGrp.destroyEach();
    
    eGrp.setLifetimeEach(-1);
    fGrp.setLifetimeEach(-1);
    
  }
   monkey.velocityY =  monkey.velocityY + 0.8;
  monkey.collide(invisible) ;
  drawSprites();  
}

function fruits(){
  if(frameCount % 80 === 0){
    fruit = createSprite(550,100,10,10);
    fruit.y = Math.round(random(350,500));
    fruit.velocityX = -7;
    fruit.addImage("fruit",bananaImage);
    fruit.scale = 0.1;
    fruit.lifetime = 200;
    fGrp.add(fruit);
                         
  }
}

function stones(){
  if(frameCount % 200 === 0 ){
   enemy = createSprite(400,550,10,10);
  enemy.velocityX = -4;
  enemy.addImage("enemy",obstacleImage);
  
  enemy.scale = 0.1;
  enemy.lifetime = 200;
  eGrp.add(enemy);
    
    enemy.depth = monkey.depth;
    monkey.depth ++;
}
}




