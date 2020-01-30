const Discord = require("discord.js");
const { prefix, token, roles, giveawayChannel } = require("./config.json");

const { addGiveawayRole } = require("./commands/addRole");
const dittoGiveawayCommands = require("./commands/dittoGiveaway");

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
  client.user.setActivity("#ditto-bot-contest for a new face", {
    type: "WATCHING"
  });
});

const roleCheck = message =>
  message.member.roles.some(r => roles.includes(r.name));

client.on("message", message => {
  if (message.content.startsWith(prefix) && roleCheck(message)) {
    const variable = message.content.split(prefix)[1];

    if (variable === "ding") {
      message.channel.send("Dong.");
    }

    switch (message.channel.id) {
      case giveawayChannel:
        dittoGiveawayCommands(message, variable);
      default:
        return;
    }
  }

  if (
    message.channel.id === giveawayChannel &&
    roleCheck(message) &&
    message.mentions.members.first()
  ) {
    addGiveawayRole(message);
  }
});

client.login(token);
