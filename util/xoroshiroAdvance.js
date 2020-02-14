function rotateLeft(first, second) {
  return ((first << second) & 0xffffffffffffffffn) | (first >> (64n - second));
}

function xoroshiroAdvance(s0, s1) {
  const randomNum = (s0 + s1) & 0xffffffffffffffffn;
  const temp = s1 ^ s0;
  const next_s0_2 =
    rotateLeft(s0, 24n) ^ temp ^ ((temp << 16n) & 0xffffffffffffffffn);
  const next_s1_2 = rotateLeft(temp, 37n);

  return [
    next_s0_2 & 0xffffffffffffffffn,
    next_s1_2 & 0xffffffffffffffffn,
    randomNum
  ];
}

module.exports = xoroshiroAdvance;
