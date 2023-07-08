var buttonColours = ["purple", "blue", "green", "yellow"];
var gamePattern = [];
var user_pattern = [];
var log = "success";
var level = 0;
var started = 1;

$(document).on('click touchstart',function(){
    if(started){
        $("h1").text("level "+level)
        nextSequence();
        started = 0;
    }
});


function nextSequence(){
    user_pattern = [];
    level+=1;
    $("h1").text("level "+level)
    var random_num = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[random_num]
    gamePattern.push(randomChosenColour)
    anime(randomChosenColour);
}

function anime(v){
    $("#"+v).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio(v+".mp3");
    audio.play();
    $("body").addClass(v+"1");
    setTimeout(function(){
        $("body").removeClass(v+"1");
    },150)
}


    $(".btn").on("click",function() {
        userChosenColour = $(this).attr("id");
        user_pattern.push(userChosenColour);
        //alert(user_pattern)
        playSound(userChosenColour);
        animatePress(userChosenColour);
        setInterval(checkAnswer(user_pattern.length-1), 9000);
      } );

function playSound(name) {
    var audio = new Audio(name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
function checkAnswer(currentLevel){
        if (user_pattern[currentLevel] == gamePattern[currentLevel]){
            if(user_pattern.length == gamePattern.length ){
                setInterval(nextSequence(), 9000);
            }
        }
        else{
            var audio = new Audio("wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function(){
              $("body").removeClass("game-over");
            },300);
            $("h1").text("Game Over, Press Any Key to Restart")
            startOver();
        }
    }
function startOver(){
    gamePattern = [];
    user_pattern = [];
    log = "success";
    level = 0;
    started = 1;
    $(document).keypress(function(){
        if(started){
            $("h1").text("level "+level)
            nextSequence();
            started = 0;
        }
    });
}