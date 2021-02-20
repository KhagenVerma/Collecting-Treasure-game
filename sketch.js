var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver;

var path,boy,cash,diamonds,jwellery,sword;

var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;

var treasureCollection = 0;

var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  stopedBoy = loadAnimation("boy-2.png");
}

function setup(){
  
  createCanvas(400,460);
// Moving background
path=createSprite(200,150);
path.addImage(pathImg);
path.scale = 0.38;


//creating boy running
boy = createSprite(70,400,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("colided",stopedBoy);
boy.scale=0.08;
  
  boy.setCollider("circle",0,0,600);
  boy.debug = false;

  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

gameOver = createSprite(200,250,20,20);
gameOver.addAnimation("GM",endImg);
gameOver.scale = 0.7
  

  
}


function draw() {

  background(0);
  
  
  if(gameState === PLAY){
    if(path.y > 400 ){
    path.y = height/2;
   }
    
    gameOver.visible = false;
    
    boy.x = World.mouseX;
    path.velocityY = 6;
    if(boy.isTouching(cashG)){
      cashG.destroyEach();
      treasureCollection = treasureCollection+50; 
    }
    if(boy.isTouching(diamondsG)){
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+50; 
    }
    if(boy.isTouching(jwelleryG)){
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+50; 
    }
    if(boy.isTouching(swordGroup)){
      gameState = END;
    }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  }
  else if (gameState === END) {
    path.velocityY = 0;
    boy.velocityY = 0;
    boy.velocityX = 0;
    swordGroup.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    cashG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    
    swordGroup.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    cashG.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);
    
    boy.changeAnimation("colided",stopedBoy);
    
    gameOver.visible = true;
    
      if(boy.isTouching(swordGroup)){
        swordGroup.destroyEach();
        jwelleryG.destroyEach();
        diamondsG.destroyEach();
        cashG.destroyEach();
        boy.destroy();
  }
    
    
  }
  

  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 120 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 6;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 60 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 6;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 6;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 100 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 6;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}