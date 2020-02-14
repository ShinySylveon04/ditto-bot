const calculateRaidSeed = require("../../util/calculateRaidSeed");

function raidSeed(pokemon) {
  const ivs = pokemon.pkx.IVs;
  const EC = BigInt(pokemon.pkx.EncryptionConstant);
  const PID = BigInt(pokemon.pkx.PID);

  const newIVs = [ivs[0], ivs[1], ivs[2], ivs[4], ivs[5], ivs[3]]; // IVs are returned in order of HP/Atk/Def/Spe/Spa/Spd
  console.log(newIVs);

  console.log("Calculating Raid Seed");
  const raidSeed = calculateRaidSeed(EC, PID, newIVs);
  console.log("Found seed:", raidSeed.toString(16));
  return raidSeed;
}

module.exports = raidSeed;
