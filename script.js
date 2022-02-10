class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.score = {
      upper: {
        aces: [],
        twos: [],
        threes: [],
        fours: [],
        fives: [],
        sixes: [],
      },
      lower: {
        threeKind: [],
        fourKind: [],
        fullHouse: [],
        smallStraight: [],
        largeStraight: [],
        yahtzee: [],
        chance: [],
      },
    };
  }
}

const rollBtn = $(".roll");
const scoreBtn = $(".score");
const userPrompt = $("#userPrompt");

const playerOne = new Player("Chet");

let hand, timesRolled;

timesRolled = 0;

rollBtn.click(() => {
  rollDice();
});

scoreBtn.click(() => {
  timesRolled = 0;
  placeScore();
  $(".dice").removeClass("dice--selected");
  promptUser("Click on Roll button to begin");
});

// // console log player's upper score
// for (const key in playerOne.score.upper) {
//   console.log(key);
//   console.log(playerOne.score.upper[key]);
// }

// toggle class 'dice-selected' whenever user clicks on a die
for (let i = 1; i <= 6; i++) {
  let die = $(`#d${i}`);
  die.click(() => {
    die.toggleClass("dice--selected");
  });
}

// Iterate through all dice and roll new number if die does NOT have class 'dice--selected' and player has not already rolled 3 times
function rollDice() {
  if (timesRolled < 3) {
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
    promptUser("No more rolls, you must place a score");
  }
}

function promptUser(message) {
  userPrompt.text(message);
}

function displayScoreBox() {
  for (const key in playerOne.score.upper) {
    $("#scoreBoxUpper").append(
      `<input type='radio' id='upper.${key}' name='score'><p>${key}</p>`
    );
  }

  for (const key in playerOne.score.lower) {
    $("#scoreBoxLower").append(
      `<input type='radio' id='lower.${key}' name='score'><p>${key}</p>`
    );
  }
}

function displayPlayerScore() {
  for (const key in playerOne.score.upper) {
    $("#scoreBoxUpper").append(`<p>${playerOne.score.upper[key]}</p>`);
  }

  for (const key in playerOne.score.lower) {
    $("#scoreBoxLower").append(`<p>${playerOne.score.lower[key]}</p>`);
  }
}

displayScoreBox();

displayPlayerScore();

function placeScore() {
  //$(".btns-box").append("<button class='submitScore'>Submit</button>");
  hand = [];
  $(".dice").each(function () {
    const score = $(this).attr("src");
    hand.push(Number(score.split("")[12]));
  });
  promptUser("Select the box you would like to score then click enter");
  let scoreBox = $("input[name=score]:checked").attr("id");
  if (playerOne.score[scoreBox]) {
    promptUser("Sorry, that box has already been scored");
  } else {
    playerOne.score[scoreBox] = hand;
  }
}
