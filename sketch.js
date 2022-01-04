var Square ,squareImage;
var blocker, blockerImage; 
var blockerG, giverG;
var score = 0;
var ranNum = 0; 
var sqNum = 1;
var giver , giverImage ;


function preload(){
    squareImage = loadImage("Character.png");
    giverImage = loadImage("life.png");
    blockerImage = loadImage("Enemy.webp");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    Square = createSprite(windowWidth/2,windowHeight-100,100,100,"0");
    Square.addImage(squareImage);
    Square.scale  = 1;
} 

function draw() {
    background("white");
    blockerG = createGroup();
    giverG = createGroup();
    Square.x = World.mouseX;

    if (World.frameCount % 160 == 0){
        spawnBlocker();
    }

    if (World.frameCount % 180 == 0){
        spawnGiver();
    }

    if (blockerG.isTouching(Square)){
        blocker.velocityY = 0;
        sqNum = sqNum - 1;
        score = score + 1;
        blocker.destroy();
        console.log("HIT");
    }

    if (giverG.isTouching(Square)){
        giverG.setVelocityYEach = 0;
        sqNum = sqNum  + 1;
        giverG.destroyEach();
    }

    if (sqNum < 0){
        GameOver();
    }

    //console.log(frameCount);
    
    fill("black");
    textSize(17.5);
    text("Score:" + score,5,25);
    text("Lives:" + sqNum,5,50)
 drawSprites();
}

function spawnBlocker(){
    blocker = createSprite(Math.round(random(50,windowWidth-50)),windowHeight-710,100,100);
    blocker.addImage(blockerImage);
    blocker.scale  = 0.4;
    blocker.velocityY=6;
    blockerG.add(blocker)
    if(blocker.y > windowHeight + 100){
        blocker.destroy();
    }
    blocker.lifetime = 100;
    console.log("Added Blocker");
}

function spawnGiver(){
    giver = createSprite(Math.round(random(50,windowWidth-50)),windowHeight-710,100,100);
    giver.addImage(giverImage);
    giver.scale = 0.5;
    giver.velocityY = 6;
    giver.lifetime = 50;
    giverG.add(giver);
    if (giver.y > windowHeight + 100){
        giver.destroy();
    }
    giver.lifetime = 100;
    console.log("Added Giver");
}

function GameOver(){
    blocker.velocityY = 0;
    giver.velocityY = 0;
    blocker.lifetime += 1;
    giver.lifetime += 1;
    gameOver.visable = true;
    restartButton.visable = true;
}