const sleep = require("./sleep");
const { A, Y, DDown } = require("./commands");
const typeLinkCode = require("./typeLinkCode");
const botStatus = require("../discord/botStatus");

async function startLinkTrade() {
  botStatus.tradeStart = new Date().getTime();
  console.log("Bot started");
  Y();
  await sleep(2000);
  A();
  await sleep(2000);
  DDown();
  await sleep(200);
  A();
  await sleep(2000);
  A();
  await sleep(4000);
  typeLinkCode();
}

module.exports = startLinkTrade;
