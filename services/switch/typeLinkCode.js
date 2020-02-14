const sleep = require("./sleep");
const beginSearch = require("./beginSearch");
const { Plus } = require("./commands");
const {
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  zero
} = require("./numbers");

async function typeLinkCode() {
  console.log("Typing in code");
  await zero();
  await three();
  await one();
  await six();
  Plus();
  await sleep(2000);
  beginSearch();
}

module.exports = typeLinkCode;
