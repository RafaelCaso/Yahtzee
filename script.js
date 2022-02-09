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

const rollDiceEl = $(".dice");
const rollBtn = $(".roll");
const userPrompt = $("#userPrompt");

const playerOne = new Player("Chet");

// toggle class 'dice-selected' whenever user clicks on a die
for (let i = 1; i <= 6; i++) {
  let die = $(`#d${i}`);
  die.click(() => {
    die.toggleClass("dice--selected");
  });
}

let rollAmount = 0;
let diceToRoll = 5;
let firstHand = [];

// Rolls new number if die does NOT have class 'dice--selected'
function rollDice() {
  firstHand = [];
  $(".dice").each(function () {
    if ($(this).hasClass("dice--selected")) {
      void 0;
    } else {
      let n = Math.trunc(Math.random() * 6) + 1;
      $(this).attr("src", `images/dice-${n}.png`);
      firstHand.push(n);
      console.log(firstHand);
    }
  });
}

rollBtn.click(() => {
  rollDice();
});

function promptUser() {
  userPrompt.text(
    `Which dice would you like to keep, ${playerOne.playerName}?`
  );
}
