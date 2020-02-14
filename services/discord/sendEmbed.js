const Discord = require("discord.js");

function sendEmbed(title, content) {
  const embed = new Discord.RichEmbed()
    .setTitle(title)
    .setColor(0x9cc4b2)
    .setDescription(content)
    .setTimestamp();

  return embed;
}

module.exports = sendEmbed;
