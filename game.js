var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

function nextSequence() {
  level++;
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).css({
    opacity: 0
  });
  $("#" + randomChosenColour).animate({
    opacity: 1
  }, 400);
  // $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  //animatePress("#"+randomChosenColour);
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  for (var i = 0; i < currentLevel; i++) {
    if (userClickedPattern[i] === gamePattern[i]) {
      //console.log("success");
    } else {
      //console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      startOver();
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");

    }
  }
  if (currentLevel === gamePattern.length) {

    //5. Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function() {
      nextSequence();
    }, 1000);

  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  userClickedPattern = [];
}

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length);
  //console.log(userClickedPattern);
});

var level = 0;

$(document).keypress(function() {
  if (level === 0) {
    //$("#level-title").text("Level " + level);

    nextSequence();

    //console.log(level);
  }
});