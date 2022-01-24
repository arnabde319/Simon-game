var gamePattern=[];
var userClickedPattern=[];

var buttonColours=["red","blue","green","yellow"];

var level=0;
var started=false;

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

function playSound(name){

  var audio=new Audio("sounds/"+name+(".mp3"));
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success")
    if(userClickedPattern.length===gamePattern.length){
      if(gamePattern.length == 8){
        $("body").addClass("game-won");
        $("#level-title").text("CONGRATULATION! You won the Game, press any key to restart.");
        setTimeout(function(){
          $("body").removeClass("game-won");
        },200);
        startOver();
      }else{
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, press any key to restart.");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    startOver();
  }

}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
