const { A, DDown, DUp, DRight, DLeft } = require("./commands");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function one() {
  A();
  await sleep(500);
}

async function two() {
  DRight();
  await sleep(500);
  A();
  await sleep(500);
  DLeft();
  await sleep(500);
}

async function three() {
  for (let i = 0; i < 2; i++) {
    DRight();
    await sleep(500);
  }
  A();
  await sleep(500);
  for (let i = 0; i < 2; i++) {
    DLeft();
    await sleep(500);
  }
}

async function four() {
  DDown();
  await sleep(500);
  A();
  await sleep(500);
  DUp();
  await sleep(500);
}

async function five() {
  DDown();
  await sleep(500);
  DRight();
  await sleep(500);
  A();
  await sleep(500);
  DLeft();
  await sleep(500);
  DUp();
  await sleep(500);
}

async function six() {
  DDown();
  await sleep(500);
  DRight();
  await sleep(500);
  DRight();
  await sleep(500);
  A();
  await sleep(500);
  DLeft();
  await sleep(500);
  DLeft();
  await sleep(500);
  DUp();
  await sleep(500);
}

async function seven() {
  DDown();
  await sleep(500);
  DDown();
  await sleep(500);
  A();
  await sleep(500);
  DUp();
  await sleep(500);
  DUp();
  await sleep(500);
}

async function eight() {
  DDown();
  await sleep(500);
  DDown();
  await sleep(500);
  DRight();
  await sleep(500);
  A();
  await sleep(500);
  DLeft();
  await sleep(500);
  DUp();
  await sleep(500);
  DUp();
  await sleep(500);
}

async function nine() {
  DDown();
  await sleep(500);
  DDown();
  await sleep(500);
  DRight();
  await sleep(500);
  DRight();
  await sleep(500);
  A();
  await sleep(500);
  DLeft();
  await sleep(500);
  DLeft();
  await sleep(500);
  DUp();
  await sleep(500);
  DUp();
  await sleep(500);
}

async function zero() {
  DDown();
  await sleep(500);
  DDown();
  await sleep(500);
  DDown();
  await sleep(500);
  A();
  await sleep(500);
  DUp();
  await sleep(500);
  DUp();
  await sleep(500);
  DUp();
  await sleep(500);
  DLeft();
  await sleep(500);
}

module.exports = { one, two, three, four, five, six, seven, eight, nine, zero };
