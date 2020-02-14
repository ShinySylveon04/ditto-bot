//peek <address in hex, prefaced by 0x> <amount of bytes, dec or hex with 0x>
//poke <address in hex, prefaced by 0x> <data, if in hex prefaced with 0x>

const fs = require("fs");
const sendPokemon = require("../api/sendPokemon");
const sendMessage = require("../discord/sendMessage");
const { Plus } = require("./commands");
const botStatus = require("../discord/botStatus");
const conn = require("./index");
const endSearch = require("./endSearch");
const checkQueue = require("../../util/checkQueue");
const continueSearch = require("./continueSearch");
const sendRaidSeed = require("../discord/sendRaidSeed");
const removeFromQueue = require("../firebase/removeFromQueue");
const sleep = require("./sleep");
const { channel } = require("../discord/config.json");

function ping() {
  Plus();
}

setInterval(() => {
  if (new Date().getTime() - botStatus.lastUse > 300000) {
    console.log("Ping");
    ping();
  }
}, 300000);

setInterval(async () => {
  if (
    new Date().getTime() - botStatus.tradeStart > 120000 &&
    botStatus.searching
  ) {
    console.log("No trade found, skipping");
    await endSearch();
    await sendMessage("Skipping", "No trade found", channel);
    botStatus.searching = false;
    await removeFromQueue(botStatus.user);
    await sleep(1000);
    await checkQueue();
  }
}, 10000);

conn.on("connect", function() {
  console.log("Connected to server");
  setTimeout(() => {
    conn.write("peek 0x2E32206A 344 \r\n");
    console.log("Reading Pokemon");
  }, 1000);
});

conn.on("data", function(data) {
  fs.writeFileSync("./test.ek8", Buffer.from(data, "hex"));
  newData = Buffer.from(data, "hex");
  if (botStatus.started) {
    botStatus.oldData = newData;
    botStatus.started = false;
  } else {
    console.log("Sending Pokemon");
    sendPokemon(Buffer.from(data, "hex"))
      .then(async pokemon => {
        const isEqual = botStatus.oldData.equals(newData);

        if (isEqual || pokemon === undefined || pokemon.pkx.Sanity !== 0) {
          continueSearch();
        } else {
          botStatus.tradeStart = new Date().getTime();
          console.log("In trade");
          await sendRaidSeed(pokemon);
          botStatus.oldData = newData;
          botStatus.searching = false;
          botStatus.lastUse = Date.now();
          await removeFromQueue(botStatus.user);
          await sleep(1000);
          await checkQueue();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
});

conn.on("error", function(err) {
  console.log("Error in connection:", err);
});

conn.on("close", function() {
  console.log("connection got closed, will try to reconnect");
  conn.end();
});

conn.on("end", function() {
  console.log("Requested an end to the TCP connection");
});
