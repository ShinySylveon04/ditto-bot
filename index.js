const Discord = require("discord.js");
const {
  prefix,
  token,
  giveawayRole,
  roles,
  okayEmoji,
  giveawayChannel
} = require("./config.json");

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

const addGiveawayRole = message => {
  const member = message.mentions.members.first();

  if (member.id !== message.author.id) {
    member
      .addRole(giveawayRole)
      .then(console.log(`Giveaway role added to ${member.displayName}`))
      .then(message.react(message.guild.emojis.get(okayEmoji)))
      .catch(console.error);
  }
};

const roleCheck = message =>
  message.member.roles.some(r => roles.includes(r.name));

const removeRole = (message, membersWithRole) => {
  if (membersWithRole.size !== 0) {
    membersWithRole.map(member => {
      member.removeRole(giveawayRole);
    });

    message.channel.send("Giveaway role removed!");
  } else {
    message.channel.send("No members have giveaway role!");
  }
};

client.on("message", message => {
  const membersWithRole = message.guild.roles.get(giveawayRole).members;

  if (message.content.startsWith(prefix) && roleCheck(message)) {
    const variable = message.content.split(prefix)[1];

    if (variable === "ding") {
      message.channel.send("Dong.");
    }

    if (message.channel.id === giveawayChannel) {
      switch (variable) {
        case "remove":
          removeRole(message, membersWithRole);
          break;
        case "role":
          message.channel.send(
            `Got ${membersWithRole.size} members with giveaway role.`
          );
          break;
        default:
          break;
      }
    }
  }

  if (message.mentions.members && message.channel.id === giveawayChannel) {
    addGiveawayRole(message);
  }
});

client.login(token);
