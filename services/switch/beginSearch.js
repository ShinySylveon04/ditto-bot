const botStatus = require("../discord/botStatus");
const sleep = require("./sleep");
const { A } = require("./commands");
const peek = require("./peek");

async function beginSearch() {
  for (i = 0; i <= 4; i++) {
    A();
    await sleep(700);
  }
  console.log("Searching");
  botStatus.tradeStart = new Date().getTime();
  await sleep(15000);
  peek();
}

module.exports = beginSearch;
