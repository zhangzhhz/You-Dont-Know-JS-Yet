"use strict";

function randMax(max) {
  return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
  symbols: [
      "♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"
  ],
  spin() {
      if (this.position == null) {
          this.position = randMax(
              this.symbols.length - 1
          );
      }
      this.position = (
          this.position + 100 + randMax(100)
      ) % this.symbols.length;
  },
  display() {
      if (this.position == null) {
          this.position = randMax(
              this.symbols.length - 1
          );
      }
      return this.symbols[this.position];
  }
};

var slotMachine = {
  reels: [
      // this slot machine needs 3 separate reels
      // hint: Object.create(..)
      Object.create(reel),
      Object.create(reel),
      Object.create(reel),
  ],
  spin() {
      this.reels.forEach(function spinReel(reel){
          reel.spin();
      });
  },
  display() {
      // TODO
      this.reels.forEach(function displayReel(reel) {
        let prev = reel.position - 1;
        if (prev === -1) {
            prev = reel.symbols.length - 1;
        }
        let next = (reel.position + 1) % reel.symbols.length;
        console.log(`${reel.symbols[prev]} | ${reel.display()} | ${reel.symbols[next]}`);
      });
  }
};

slotMachine.spin();
slotMachine.display();
// ☾ | ☀ | ★
// ☀ | ♠ | ☾
// ♠ | ♥ | ☀

slotMachine.spin();
slotMachine.display();
// ♦ | ♠ | ♣
// ♣ | ♥ | ☺
// ☺ | ♦ | ★