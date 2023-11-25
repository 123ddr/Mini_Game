//Run Sound
var runSound = new Audio("run.mp3");
runSound.loop = true;

//jump Sound
var jumpSound = new Audio("jump.mp3");

//Dead Sound
var deadSound = new Audio("dead.mp3");






//Key Event
function keyCheck(event){
    //Enter Key
    if(event.which==13){
        if (runWorkerId==0){
            runWorkerId=setInterval(run,100);
            runSound.play();

            moveBackgroundWorkerId = setInterval(moveBackground,100);
            scoreWorkerId = setInterval(updateScore,100);
            createBlockWorkerId = setInterval(createBlock,100);
            moveBlockWorkerId = setInterval(moveBlock,100);
        }
    }
    

    //Space Key
    if(event.which==32){
        if(jumpWorkerId==0){

            clearInterval(runWorkerId);
            runSound.pause();
            runWorkerId = -1;
            jumpWorkerId=setInterval(jump,100);
            jumpSound.play();
        }

    }

}




//Boy Run
var boyId = document.getElementById("boy");
var runImageNumber = 1;
var runWorkerId = 0;

function run(){
    runImageNumber++;
    
    //Run Image Crash
    if(runImageNumber==9){
        runImageNumber=1;
    }
    boyId.src = "Run (" +runImageNumber+ ").png";
}

//Boy Jump
var jumpImageNumber = 1;
var jumpWorkerId =0;
var boyMarginTop = 310;

function jump(){
    jumpImageNumber++;

    //Jump Fly
    if(jumpImageNumber <=7){
        boyMarginTop = boyMarginTop - 20;
        boyId.style.marginTop = boyMarginTop + "px";
    }
     //Jump Land
     if(jumpImageNumber >=8){ 
         boyMarginTop = boyMarginTop + 20;
        boyId.style.marginTop = boyMarginTop + "px";
    }
        
     


    //Jump Image Crash
    if(jumpImageNumber==13){
        jumpImageNumber=1;

        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run,100);
        runSound.play();

        jumpWorkerId = 0;

        //Startin a jump
        if(scoreWorkerId==0){
            scoreWorkerId = setInterval(updateScore,100);

        }

        if(moveBackgroundWorkerId==0){
            moveBackgroundWorkerId = setInterval(moveBackground,100);

        }

        if(createBlockWorkerId==0){
            createBlockWorkerId = setInterval(createBlock,100);
        }

        if(moveBlockWorkerId==0){
            moveBlockWorkerId = setInterval(moveBlock,100);
        }
    }

    boyId.src = "Jump (" +jumpImageNumber+ ").png";
}

//Move Background
var backgroundId = document.getElementById("background");
var moveBackgroundWorkerId = 0;
var positionX = 0;

function moveBackground(){
    positionX = positionX - 20;
    backgroundId.style.backgroundPositionX = positionX + "px";
}

//Score
var scoreId = document.getElementById("score");
var scoreWorkerId = 0;
var newScore = 0;

function updateScore(){

    newScore++;
    scoreId.innerHTML = newScore;

}

//Create Block
var blockMarginLeft = 500;
var createBlockWorkerId = 0;
var blockNumber = 1;

function createBlock(){

    var block = document.createElement("div");
    block.className = "block";
    block.id ="block" + blockNumber;

    blockNumber++;

    var gap = Math.random()*(1000-400)+400;

    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);

}

//Move Block
var moveBlockWorkerId = 0;

function moveBlock(){

    for(var i=1; i<=blockNumber; i++){

        var currentBlock = document.getElementById("block" + i);

        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;

        currentBlock.style.marginLeft = newBlockMarginLeft + "px";

       //alert(newBlockMarginLeft);
       //202-22

       if(newBlockMarginLeft<202 & newBlockMarginLeft > 22){

       //alert(boyMarginTop);
        //300

        if(boyMarginTop > 300){

            clearInterval(runWorkerId);
            runSound.pause();
            clearInterval(jumpWorkerId);
            jumpWorkerId = -1;
            clearInterval(scoreWorkerId);
            clearInterval(moveBackgroundWorkerId);
            clearInterval(createBlockWorkerId);
            clearInterval(moveBlockWorkerId);
            

        deadWorkerId = setInterval(dead,100);
        deadSound.play();

        //alert("Dead");
    }
       }

    }
}


//Boy Dead
var deadWorkerId = 0;
var deadImageNumber = 1;

function dead(){

    deadImageNumber++;

    //Dead Image Crash
    if(deadImageNumber==11){
        deadImageNumber=10;
        boyId.style.marginTop = "310px";

        document.getElementById("endScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }

    boyId.src = "Dead (" +deadImageNumber+ ").png";
}
//page Reload
function reload(){

    location.reload();
}