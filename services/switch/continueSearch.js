const botStatus = require("../discord/botStatus");
const sleep = require("./sleep");
const peek = require("./peek");

async function continueSearch() {
  if (botStatus.searching) {
    console.log("Still searching");
    await sleep(10000);
    peek();
  }
}

module.exports = continueSearch;
