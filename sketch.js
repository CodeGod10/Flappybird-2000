//step 1- add 3 functions that we make for preload, setup, draw
//step 2- Decide canvas size and make it in setup
//step 3- preload pictures and make sprite
var score=0
var bg, bgImg
var bird,birdImg
var pipeGroup
var gameState = "start";
var gameoverImg, deadBirdImg
var gameover, deadBird
var bugImg, bugGroup
var score = 0;
var yay,yayImg
var startButton,startButtonImg
function preload(){
    bgImg = loadImage("asset/sky1.png")
    birdImg = loadAnimation("asset/b1.png","asset/b2.png","asset/b3.png","asset/b4.png")
    bpipeImg=loadImage('asset/pipeBottom.png')
    tpipImg=loadImage('asset/pipeTop.png')
    deadBirdImg=loadImage("asset/sadBird.jpg")
    gameoverImg= loadImage("asset/gameover.jpg")
    bugImg=loadImage("asset/worm.png")
    yayImg=loadImage("asset/feedingMom.jpg")
    startButtonImg=loadImage("asset/orange.png")
}

//setup only runs once
function setup(){
    createCanvas(1400,800)
    bg=createSprite(700, 400)
    bg.addImage(bgImg);

    bird=createSprite(160,310)
    bird.addAnimation('flying',birdImg)
    bird.scale=0.57
    bugGroup=createGroup()
    pipeGroup=createGroup()


}

//draw runs again and again
function draw(){
    background("black");
    drawSprites()
    fill("pink")
    textSize(50)
    text("Score: "+ score,700,50)

    if(gameState=="start"){
        startButton=createSprite(700, 550)
        startButton.addImage(startButtonImg)
        startButton.scale=0.15;
        score = 0
        bird.y = 310;

        if(mousePressedOver(startButton)){
            gameState="play"
        }
    }

    if(gameState == "play"){
        startButton.destroy()
        bird.velocityY= bird.velocityY+0.2;
        if(keyDown("space")){
            bird.velocityY=-4.4536367566645658465778906546
        }
    
        //condition for bird to die
        if(bird.isTouching(pipeGroup) || bird.y>800){
            gameState='end'
        }

        for(var i = 0; i<bugGroup.length ; i++){
            if(bird.isTouching(bugGroup[i])){
                score = score+1;
                bugGroup[i].destroy()
            }
        }

        // add condition to check if score >100, make you win pic and add image of mommy bird feeding
        if(score>100){
            gameState="win"  
        }
    
        makePipe()
    }
    if(gameState == "win"){
        yay=createSprite(700, 400)
        yay.addImage(yayImg)
        yay.scale=2.3;
       
    }
    if(gameState == "end"){
        pipeGroup.setVelocityXEach(0);
        pipeGroup.setLifetimeEach(-1)

        // make deadBird sprite and addImage to it
        deadBird=createSprite(700, 400)
        deadBird.addImage(deadBirdImg)


        // make gameover sprite and addImage to it
        gameover=createSprite()
        gameover.addImage(gameoverImg)
        gameover.scale=0.81
       
    
        
    }

   
    
}

// whenever we make function, we have to call it in function draw
function makePipe(){
    // % (modulo sign in code) gives us the remainder between 2 numbers
    
    if(frameCount % 90 == 0){
    

        var pipeTop=createSprite(1400,random(-100, 150));
        pipeTop.addImage(tpipImg)
        pipeTop.velocityX=-(5+0.2)
        pipeTop.scale=0.72323565567  ;
        pipeTop.lifetime = 300

        var bug1=createSprite(1400, random(pipeTop.y +390,pipeTop.y +420 ))
        bug1.addImage(bugImg)
        bug1.velocityX=-(5+0.2)
        bug1.scale=0.1

        var bug2=createSprite(1400+200, random(pipeTop.y +390,pipeTop.y +420 ))
        bug2.addImage(bugImg)
        bug2.velocityX=-(5+0.2)
        bug2.scale=0.1

        var bug3=createSprite(1400+400, random(pipeTop.y +390,pipeTop.y +420 ))
        bug3.addImage(bugImg)
        bug3.velocityX=-(5+0.2)
        bug3.scale=0.1
        
        var pipeBottom = createSprite(1400,pipeTop.y +900)
        pipeBottom.addImage(bpipeImg)
        pipeBottom.velocityX=-(5+0.2)
        pipeBottom.scale=0.723
        pipeBottom.lifetime=300

        pipeGroup.add(pipeTop)
        pipeGroup.add(pipeBottom)

        bugGroup.add(bug1)
        bugGroup.add(bug2)
        bugGroup.add(bug3)
    }

          
}


