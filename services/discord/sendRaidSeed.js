const raidSeed = require("../switch/obtainRaidSeed");
const findShinyFrames = require("../../util/findShinyFrames");
const endTrade = require("../switch/endTrade");
const sendMessage = require("./sendMessage");
const { channel } = require("./config.json");

async function sendRaidSeed(pokemon) {
  const seed = raidSeed(pokemon);
  await endTrade();
  const shinyFrames = seed !== 0 ? findShinyFrames(seed) : ["None"];

  const trainerName =
    pokemon.pkx["HT_Name"] === ""
      ? pokemon.pkx["OT_Name"]
      : pokemon.pkx["HT_Name"];

  const content =
    raidSeed === 0
      ? `Raid seed not found`
      : `**Raid Seed:** \n ${seed.toString(
          16
        )} \n  \n **Next Shiny Frames:** \n ${shinyFrames.join("\n")}`;

  const title = `Trading with ${trainerName}`;

  console.log("Sending Message");
  sendMessage(title, content, channel);
}

module.exports = sendRaidSeed;
