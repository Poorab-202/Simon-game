var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  var userChosenColor = this.id;
  if (checkAnswer(userClickedPattern.length, userChosenColor)) {
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animate(userChosenColor);
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      nextSequence();
    }
  } else {
    $("#level-title").text("Game Over! Press any key to restart the game.");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    level = 0;
    started = false;
    userClickedPattern = [];
    gamePattern = [];
  }
});

function checkAnswer(index, color) {
  if (gamePattern[index] === color) {
    return true;
  } else return false;
}

function nextSequence() {
  setTimeout(function () {
    level++;
    $("#level-title").text("level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColors[randomNumber]);
    setTimeout(function () {
      $("#" + buttonColors[randomNumber])
        .fadeOut(170)
        .fadeIn(170);
      playSound(buttonColors[randomNumber]);
    }, 200);
  }, 300);
}

function animate(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
