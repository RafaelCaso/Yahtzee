let score = [[], [], [], [], [], [], [], [], [], [], [], [], []];
let names = [
  "aces",
  "twos",
  "threes",
  "fours",
  "fives",
  "sixes",
  "Three of a Kind",
  "Four of a Kind",
  "Full House",
  "Small Straight",
  "Large Straight",
  "Yahtzee",
  "Chance",
];

const rollBtn = $(".roll");
const scoreBtn = $(".score");
const userPrompt = $("h1");

let hand, timesRolled, canRoll, isPlaying;

canRoll = true;
isPlaying = true;

timesRolled = 0;

rollBtn.click(() => {
  if (isPlaying) {
    if (canRoll) {
      rollDice();
    }
  }
});

scoreBtn.click(() => {
  timesRolled = 0;
  placeScore();
  $(".dice").removeClass("dice--selected");
  checkGameOver();
  promptUser("Click on Roll button to begin");
});

// toggle class 'dice-selected' whenever user clicks on a die
for (let i = 1; i <= 6; i++) {
  let die = $(`#d${i}`);
  die.click(() => {
    die.toggleClass("dice--selected");
  });
}

// alter h1 to display message
function promptUser(message) {
  userPrompt.text(message);
}

// Iterate through all dice and roll new number if die does NOT have class 'dice--selected' and player has not already rolled 3 times
function rollDice() {
  promptUser("Click on dice to hold them before rerolling");
  if (canRoll) {
    $(".dice").each(function () {
      if ($(this).hasClass("dice--selected")) {
        void 0;
      } else {
        let n = Math.trunc(Math.random() * 6) + 1;
        $(this).attr("src", `images/dice-${n}.png`);
      }
    });
    timesRolled++;
  }
  if (timesRolled === 3) {
    canRoll = false;
    $(".dice").addClass("dice--selected");
    promptUser("No more rolls, you must place a score");
  }
}

for (let i = 0; i < score.length; i++) {
  if (i < 6) {
    $("#scoreBoxUpper").append(
      `<div><label id='score-box-${i}' class='radio-label'><input type='radio' id='${i}' name='score'>${names[i]}</label><br><br></div>`
    );
  } else {
    $("#scoreBoxLower").append(
      `<div><label id='score-box-${i}' class='radio-label'><input type='radio' id='${i}' name='score'>${names[i]}</label><br><br></div>`
    );
  }
}

function placeScore() {
  // check if no radio buttons are selected
  if (!$("input").is(":checked")) {
    promptUser("Select a box to score then click 'Place Score'");
  } else {
    hand = [];
    // get the value for dice by extracting the number from image file name then push that number to hand
    $(".dice").each(function () {
      const score = $(this).attr("src");
      hand.push(Number(score.split("")[12]));
    });
    // check that player has rolled dice before scoring
    if (hand.includes(NaN)) {
      promptUser("Roll dice before scoring");
    } else {
      let scoreBox = $("input[name=score]:checked").attr("id");
      score[scoreBox] = hand;
      canRoll = true;
      $(`#score-box-${scoreBox}`).remove();
      //$(`.label${scoreBox}`).remove();
      $(".dice").removeClass("dice--selected").attr("src", "images/blank.png");
      promptUser("Click 'Roll' to begin");
    }
  }
  // check if score entered was the last score box
  if (gameIsPlaying()) {
    void 0;
  } else {
    promptUser(`Final Score:${finalScore()}`);
    isPlaying = false;
    canRoll = false;
    $(".dice").remove();
  }
}

// checks if there are any empty score boxes. If so, returns true and game continues playing
const gameIsPlaying = function () {
  let emptyBoxes = 0;
  for (let i = 0; i < score.length; i++) {
    if (score[i] === undefined || score[i].length === 0) {
      emptyBoxes++;
    } else {
      void 0;
    }
  }

  if (emptyBoxes > 0) {
    return true;
  } else {
    return false;
  }
};

// scoring
// check if score box contains corresponding dice value (v) and add 1 to total amount (a). Total then multiplied by corresponding scorebox (eg.  2 for 2's, 3 for 3's etc.)
const aceScore = (arr) => arr.reduce((a, v) => (v === 1 ? a + 1 : a), 0);

const twoScore = (arr) => arr.reduce((a, v) => (v === 2 ? a + 1 : a), 0) * 2;

const threeScore = (arr) => arr.reduce((a, v) => (v === 3 ? a + 1 : a), 0) * 3;

const fourScore = (arr) => arr.reduce((a, v) => (v === 4 ? a + 1 : a), 0) * 4;

const fiveScore = (arr) => arr.reduce((a, v) => (v === 5 ? a + 1 : a), 0) * 5;

const sixScore = (arr) => arr.reduce((a, v) => (v === 6 ? a + 1 : a), 0) * 6;

// sorted array passed as argument
const threeKindScore = function (arr) {
  if (
    (arr[0] === arr[1] && arr[1] === arr[2]) ||
    (arr[2] === arr[3] && arr[3] === arr[4])
  ) {
    return arr.reduce((a, b) => a + b, 0);
  } else {
    return 0;
  }
};
// sorted array passed as argument
const fourKindScore = function (arr) {
  if (arr[0] === arr[1] && arr[1] === arr[2] && arr[2] === arr[3]) {
    return arr.reduce((a, b) => a + b, 0);
  } else if (arr[1] === arr[2] && arr[2] === arr[3] && arr[3] === arr[4]) {
    return arr.reduce((a, b) => a + b, 0);
  } else {
    return 0;
  }
};

//sorted array passed as argument
const fullHouseScore = function (arr) {
  if (arr[0] === arr[1] && arr[1] === arr[2] && arr[3] === arr[4]) {
    return 25;
  } else if (arr[0] === arr[1] && arr[2] === arr[3] && arr[3] === arr[4]) {
    return 25;
  } else {
    return 0;
  }
};

//sorted array passed as argument
const smallStraightScore = function (arr) {
  if (arr[0] < arr[1] && arr[1] < arr[2] && arr[2] < arr[3]) {
    return 30;
  } else if (arr[1] < arr[2] && arr[2] < arr[3] && arr[3] < arr[4]) {
    return 30;
  } else {
    return 0;
  }
};

//sorted array passed as argument
const largeStraightScore = function (arr) {
  if (
    arr[0] < arr[1] &&
    arr[1] < arr[2] &&
    arr[2] < arr[3] &&
    arr[3] < arr[4]
  ) {
    return 40;
  } else {
    return 0;
  }
};

const allEqual = (arr) => arr.every((val) => val === arr[0]);
const yahtzeeScore = () => {
  if (allEqual(score[11]) && score[11].length > 0) {
    return 50;
  } else {
    return 0;
  }
};

const chanceScore = function (arr) {
  let scoreTotal = 0;
  for (let i = 0; i < arr.length; i++) {
    scoreTotal += arr[i];
  }
  return scoreTotal;
};

const finalScore = () => {
  let output =
    aceScore(score[0]) +
    twoScore(score[1]) +
    threeScore(score[2]) +
    fourScore(score[3]) +
    fiveScore(score[4]) +
    sixScore(score[5]) +
    threeKindScore(score[6].sort()) +
    fourKindScore(score[7].sort()) +
    fullHouseScore(score[8].sort()) +
    smallStraightScore(score[9].sort()) +
    largeStraightScore(score[10].sort()) +
    yahtzeeScore() +
    chanceScore(score[12]);

  return output;
};
