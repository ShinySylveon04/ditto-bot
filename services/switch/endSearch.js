const sleep = require("./sleep");
const conn = require("./index");
const { A, B, Y } = require("./commands");

async function endSearch() {
  console.log("Ending search");
  Y();
  await sleep(1000);
  for (let i = 0; i < 4; i++) {
    A();
    await sleep(1000);
  }
  B();
  await sleep(1000);
  B();
  await sleep(1000);
  B();
  await sleep(1000);
}

module.exports = endSearch;
