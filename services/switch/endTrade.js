const sleep = require("./sleep");
const { A, B } = require("./commands");
const conn = require("./index");

async function endTrade() {
  await sleep(5000);
  B();
  await sleep(700);
  A();
  await sleep(2000);
  console.log("Trade completed");
}

module.exports = endTrade;
