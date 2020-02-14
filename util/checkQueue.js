const getUser = require("../services/firebase/getUser");
const startLinkTrade = require("../services/switch/startLinkTrade");
const sendLinkCode = require("../services/discord/sendLinkCode");
const botStatus = require("../services/discord/botStatus");

const checkQueue = () => {
  console.log("Checking queue");
  if (!botStatus.searching) {
    getUser()
      .then(id => {
        if (id === undefined) {
          console.log("No queue");
          return;
          // idleBot
        } else {
          botStatus.user = id;
          sendLinkCode(id);

          startLinkTrade();
          botStatus.searching = true;
        }
      })
      .catch(error => console.log(error));
  } else {
    console.log("Already searching");
  }
};
module.exports = checkQueue;
