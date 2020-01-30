const { giveawayRole, okayEmoji } = require("../config.json");

const addGiveawayRole = message => {
  const member = message.mentions.members.first();

  if (
    member.id !== message.author.id &&
    !member.roles.some(r => ["Giveaway"].includes(r.name))
  ) {
    member
      .addRole(giveawayRole)
      .then(console.log(`Giveaway role added to ${member.displayName}`))
      .then(message.react(message.guild.emojis.get(okayEmoji)))
      .catch(console.error);
  } else {
    console.log("Role not applied");
  }
};

module.exports = addGiveawayRole;
