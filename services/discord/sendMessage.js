const Discord = require("discord.js");
const client = require("./index");

function sendMessage(title, content, channelID) {
  const embed = new Discord.RichEmbed()
    .setTitle(title)
    .setColor(0x9cc4b2)
    .setDescription(content)
    .setTimestamp();

  client.channels.find(channel => channel.id === channelID).send(embed);
}

module.exports = sendMessage;
