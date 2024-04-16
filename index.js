var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$('body').keypress(function(){
  if(started==false){
   
  nextSequence();
  started=true;
  }
})
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
})


function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
  if (userClickedPattern.length === gamePattern.length){
    
    console.log("Success");
    setTimeout(function () {
      nextSequence();
    }, 1000);
}

}
else{
  console.log("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");

  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#"+randomChosenColour).on("click",function(){
    playSound(randomChosenColour);
   
  })
}

function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function () {
  $("#" + currentColour).removeClass("pressed");
}, 100);
}