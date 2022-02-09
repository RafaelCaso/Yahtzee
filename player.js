class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.score = {
      upper: {
        aces = [],
        twos = [],
        threes = [],
        fours = [],
        fives = [],
        sixes = []
      },
      lower: {
        threeKind = [],
        fourKind = [],
        fullHouse = [],
        smallStraight = [],
        largeStraight = [],
        yahtzee = [],
        chance = []
      }
    };
  }
}
