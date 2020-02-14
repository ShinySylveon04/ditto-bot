const xoroshiroAdvance = require("./xoroshiroAdvance");

function rotateRight(first, second) {
  return (first >> second) | ((first << (64n - second)) & 0xffffffffffffffffn);
}

class RNG {
  constructor(s0, s1) {
    this.s1 = s1;
    this.s0 = s0;
  }

  next() {
    const rand = (this.s0 + this.s1) & 0xffffffffffffffffn;
    const result = xoroshiroAdvance(this.s0, this.s1);
    this.s0 = result[0] & 0xffffffffffffffffn;
    this.s1 = result[1] & 0xffffffffffffffffn;
    return rand;
  }
}

function findIVs(res, flawlessIVs) {
  const rng = new RNG(res[0], res[1]);
  const IVs = [-1, -1, -1, -1, -1, -1];
  let IVindex = -1;

  for (let m = 0; m < flawlessIVs; m++) {
    do {
      IVindex = rng.next() & 7n;
    } while (IVs[IVindex] !== -1 || IVindex >= 6);

    IVs[IVindex] = 31n;
  }

  for (let n = 0; n < 6; n++) {
    if (IVs[n] === -1) {
      IVs[n] = rng.next() & 31n;
    }
  }

  return IVs;
}

function calculateRaidSeed(ec, pid, ivs) {
  const s1 = 0x82a2b175229d6a5bn;
  const pidMask = 0x3fc000n;
  const maskedPID = pid & pidMask;
  const s0_low = (ec - s1) & 0xffffffffn;
  let temp_low = (s0_low ^ s1) & 0xffffffffn;
  temp_low = temp_low ^ (temp_low << 16n);

  for (let i = 0n; i <= 0xffn; i++) {
    for (let j = 0n; j <= 0xffn; j++) {
      const s0_high =
        (rotateRight(j ^ temp_low, 24n) & 0xffffffff00000000n) | (i << 32n);
      const partialTestSeed = s0_low | s0_high;
      let res = xoroshiroAdvance(partialTestSeed, s1); // ec
      res = xoroshiroAdvance(res[0], res[1]); // sidtid
      const testPID = (res[0] + res[1]) & pidMask; // pid

      // Only compare bits of the PID guaranteed with the missing seed bytes
      if (testPID === maskedPID) {
        for (let k = 0n; k <= 0xffffn; k++) {
          const seed = ((k << 48n) + partialTestSeed) & 0xffffffffffffffffn;
          res = xoroshiroAdvance(seed, s1); // ec
          res = xoroshiroAdvance(res[0], res[1]); // sidtid
          const generatedPID = (res[0] + res[1]) & 0xffffffffn; // pid
          res = xoroshiroAdvance(res[0], res[1]); // pid

          if (generatedPID === pid) {
            console.log(seed.toString(16));
            for (let flawlessIVs = 0; flawlessIVs <= 5; flawlessIVs++) {
              const pokemonIVs = findIVs(res, flawlessIVs);

              if (pokemonIVs.every((iv, index) => Number(iv) === ivs[index])) {
                return seed;
              }
            }
          }
        }
      }
    }
  }
  return 0;
}

module.exports = calculateRaidSeed;
