let score = [[], [], [], [], [], [], [], [], [], [], [], [], []];

const rollBtn = $(".roll");
const scoreBtn = $(".score");
const userPrompt = $("h1");

let hand, timesRolled;
let canRoll = true;
let isPlaying = true;

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

// create ui scoreboxes. id's used to
function displayScoreBox() {
  $("#scoreBoxUpper").append(
    `<input type='radio' id='0' name='score'><p class='label0'>aces</p>`
  );
  $("#scoreBoxUpper").append(
    `<input type='radio' id='1' name='score'><p class='label1'>twos</p>`
  );
  $("#scoreBoxUpper").append(
    `<input type='radio' id='2' name='score'><p class='label2'>threes</p>`
  );
  $("#scoreBoxUpper").append(
    `<input type='radio' id='3' name='score'><p class='label3'>fours</p>`
  );
  $("#scoreBoxUpper").append(
    `<input type='radio' id='4' name='score'><p class='label4'>fives</p>`
  );
  $("#scoreBoxUpper").append(
    `<input type='radio' id='5' name='score'><p class='label5'>sixes</p>`
  );
  $("#scoreBoxLower").append(
    `<input type='radio' id='6' name='score'><p class='label6'>Three of a Kind</p>`
  );
  $("#scoreBoxLower").append(
    `<input type='radio' id='7' name='score'><p class='label7'>Four of a Kind</p>`
  );
  $("#scoreBoxLower").append(
    `<input type='radio' id='8' name='score'><p class='label8'>Full House</p>`
  );
  $("#scoreBoxLower").append(
    `<input type='radio' id='9' name='score'><p class='label9'>Small Straight</p>`
  );
  $("#scoreBoxLower").append(
    `<input type='radio' id='10' name='score'><p class='label10'>Large Straight</p>`
  );
  $("#scoreBoxLower").append(
    `<input type='radio' id='11' name='score'><p class='label11'>Yahtzee</p>`
  );
  $("#scoreBoxLower").append(
    `<input type='radio' id='12' name='score'><p class='label12'>Chance</p>`
  );
}

displayScoreBox();

function placeScore() {
  if (isPlaying) {
    hand = [];
    // get the value for dice by extracting the number from image file name then push that number to hand
    $(".dice").each(function () {
      const score = $(this).attr("src");
      hand.push(Number(score.split("")[12]));
    });
    // below conditionals not working as expected
    promptUser(
      "Select the box you would like to score then click 'Place Score'"
    );
    let scoreBox = $("input[name=score]:checked").attr("id");
    if (score[scoreBox].length > 0) {
      promptUser("That box is already scored. Try again");
    } else {
      score[scoreBox] = hand;
      canRoll = true;
      $("input[name=score]:checked").remove();
      $(`.label${scoreBox}`).remove();
      $(".dice").removeClass("dice--selected").attr("src", "images/blank.png");
    }
  } else {
    void 0;
  }
  checkGameOver();
}

// upper scoring
// check if score box contains corresponding dice value (v) and add 1 to total amount (a). Total then multiplied by corresponding scorebox (eg. 2 for 2's, 3 for 3's etc.)
const aceScore = (arr) => arr.reduce((a, v) => (v === 1 ? a + 1 : a), 0);

const twoScore = (arr) => arr.reduce((a, v) => (v === 2 ? a + 1 : a), 0) * 2;

const threeScore = (arr) => arr.reduce((a, v) => (v === 3 ? a + 1 : a), 0) * 3;

const fourScore = (arr) => arr.reduce((a, v) => (v === 4 ? a + 1 : a), 0) * 4;

const fiveScore = (arr) => arr.reduce((a, v) => (v === 5 ? a + 1 : a), 0) * 5;

const sixScore = (arr) => arr.reduce((a, v) => (v === 6 ? a + 1 : a), 0) * 6;

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

const fourKindScore = function (arr) {
  if (arr[0] === arr[1] && arr[1] === arr[2] && arr[2] === arr[3]) {
    return arr.reduce((a, b) => a + b, 0);
  } else if (arr[1] === arr[2] && arr[2] === arr[3] && arr[3] === arr[4]) {
    return arr.reduce((a, b) => a + b, 0);
  } else {
    return 0;
  }
};

const fullHouseScore = function (arr) {
  if (arr[0] === arr[1] && arr[1] === arr[2] && arr[3] === arr[4]) {
    return 25;
  } else if (arr[0] === arr[1] && arr[2] === arr[3] && arr[3] === arr[4]) {
    return 25;
  } else {
    return 0;
  }
};

const smallStraightScore = function (arr) {
  if (arr[0] < arr[1] && arr[1] < arr[2] && arr[2] < arr[3]) {
    return 30;
  } else if (arr[1] < arr[2] && arr[2] < arr[3] && arr[3] < arr[4]) {
    return 30;
  } else {
    return 0;
  }
};

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

// checks if player has filled in every score box and ends game if true
const checkGameOver = function () {
  let emptyScoreBoxes = 13;

  for (let i = 0; i < score.length; i++) {
    if (score[i] === undefined || score[i].length === 0) {
      void 0;
    } else {
      emptyScoreBoxes--;
    }
  }
  if (emptyScoreBoxes === 0) {
    promptUser(`GAME OVER Your Score:${finalScore()}`);
    isPlaying = false;
    canRoll = false;
    $(".dice").remove();
  }
};
