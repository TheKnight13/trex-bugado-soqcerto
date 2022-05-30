//criar variáveis de estado do jogo
//var jumpSound, dieSound,checkPointSound;
var trex_collide;
var restartImg;
var gameOverImg;
var  gameOver, restart,gameOverImg, restartImg;
var play = 1;
var end = 0;
var gameState = play;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

//criar variável score
var score = 0; 

var newImage;

function preload(){
  
  trex_collide = loadAnimation("trex_collided.png");
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  //Adicionar obstáculos
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png"); 


restartImg = loadImage("restart.png");
gameOverImg = loadImage("gameover.png");


//sons
//jumpSound = loadSound("jump.mp3");
//dieSound = loadSound("die.mp3");
//checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collide);
  trex.scale = 0.5;   
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
gameOver = createSprite(300,100); 
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;


restart = createSprite(300,100); 
restart.addImage(restartImg);
restart.scale = 0.5;
//
trex.setCollider("circle", 0, 0, 40);
trex.debug = true;

score = 0;

}

function draw() {
  background("white");


  //mostrar pontuação na tela
  text("pontuação: " + score, 500, 50);


  //atualizar variável score com a pontuação e arredondar

  //criar if else if para checar os estados do jogo
  if(gameState === play) {
  ground.velocityX = -(4 + 3 * score/100);
  score = score + Math.round(getFrameRate()/60);

  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if(keyDown("space")&& trex.y >= 100){
  trex.velocityY = -13;

//jumpSound.play();

  }


  //gerar nuvens
  spawnClouds();
  
  //chamar função que gera objetos
  spawObtacles();
  if(obstaclesGroup.isTouching(trex)){
    gameState = end;
  
   }

//}

  } else if(gameState === end) {
  ground.velocityX = 0;
  dieSound.play();

  gameOver.visible = true;

  restart.visible = true;


  trex.changeAnimation("collided", trex_collided);

  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);

  obstaclesGroup.setLifetimeEach(0);
  cloudsGroup.setLifetimeEach(0);

  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);

}

  drawSprites();
  trex.collide(invisibleGround);

  //condição pra reiniciar jogo
  if(mousePressedOver(restart)){
  console.log("Reiniciar o Jogo");
  reset();

  }


}

function spawnClouds() {
  //escreva aqui o código para gerar nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(400,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    //mostrar profundidade
    console.log("trex: ",trex.depth);
    console.log("Cloud:", cloud.depth);

    //atribua tempo de vida à variável
    cloud.lifetime = 200;

    //ajustar a profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    }
}

//criar função que gera obstáculos
function spawObtacles() {
  if(frameCount % 60 == 0) {
    var obstacle = createSprite(400, 165, 10, 40);
    obstacle.velocityX = -(6 + score/100);

    //gerar obstáculso aleatórios com switch
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    //atribuir dimensão e tempo de vida
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

//adicionar obstaculos em grupos

obstaclesGroup.add(obstacle);
cloudsGroup = createGroup();
cloudsGroup.add(cloud); 

  }
}


function reset() {
gameState = play;
gameOver.visible = false;
restart.visible = true;

obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("running", trex_running);
}