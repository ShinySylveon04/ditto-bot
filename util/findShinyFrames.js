const xoroshiroAdvance = require("./xoroshiroAdvance");

const s1 = 0x82a2b175229d6a5bn;

let res;
function findShinyFrames(seed) {
  const shinyFrames = [];
  for (let i = 0; i < 15000; i++) {
    res = xoroshiroAdvance(seed, s1);
    seed = res[2];
    const ec = seed & 0xffffffffn; //EC
    res = xoroshiroAdvance(res[0], res[1]); //SIDTID
    const sidtid = res[2] & 0xffffffffn;
    res = xoroshiroAdvance(res[0], res[1]); //PID
    const pid = res[2] & 0xffffffffn;

    const TSV = getShinyValue(sidtid);
    const PSV = getShinyValue(pid);

    if (isShiny(TSV, PSV) === "Star" || isShiny(TSV, PSV) === "Square") {
      shinyFrames.push(`${isShiny(TSV, PSV)} ${i + 1}`);
    }
  }
  return shinyFrames === [] ? "None" : shinyFrames;
}

function getShinyValue(value) {
  return (value >> 16n) ^ (value & 0xffffn);
}

function isShiny(TSV, PSV) {
  if (PSV === TSV) {
    return "Square";
  }

  if ((PSV ^ TSV) < 0x10n) {
    return "Star";
  }

  return "None";
}

module.exports = findShinyFrames;
