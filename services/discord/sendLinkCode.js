const { client } = require("./index");
const sendEmbed = require("./sendEmbed");
const botStatus = require("./botStatus");

function sendLinkCode(id) {
  client.users
    .get(id)
    .send(sendEmbed("Start searching!", `Link Code: ${botStatus.linkCode}`));
}

module.exports = sendLinkCode;
