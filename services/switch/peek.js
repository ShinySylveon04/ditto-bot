const botStatus = require("../discord/botStatus");
const conn = require("./index");

function peek() {
  if (botStatus.searching) {
    setTimeout(() => {
      conn.write("peek 0x2E32206A 344 \r\n");
      console.log("Reading Pokemon");
    }, 10000);
  } else {
    console.log("Not searching");
  }
}

module.exports = peek;
