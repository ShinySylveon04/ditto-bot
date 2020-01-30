const { giveawayRole } = require("../config.json");

const dittoGiveawayCommands = (message, variable) => {
  switch (variable) {
    case "remove":
      removeRole(message, fetchUsers(message));
      break;
    case "role":
      message.channel.send(
        `Got ${fetchUsers(message).size} members with giveaway role.`
      );
      break;
    default:
      break;
  }
};

const removeRole = (message, membersWithRole) => {
  const memberSize = membersWithRole.size;

  const mapAsync = membersWithRole => {
    for (let i = 0; i < membersWithRole.length; i++) {
      setTimeout(() => {
        membersWithRole[i].removeRole(giveawayRole);
        message.channel.send("test");
      }, 1000);
    }
  };

  // const removeRoleTimed = message => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       //member.removeRole(giveawayRole);
  //       message.channel.send("test");
  //       resolve();
  //     }, 1000);
  //   });
  // };

  if (memberSize !== 0) {
    mapAsync(membersWithRole);
    message.channel.send("Giveaway role removed!");
  } else {
    message.channel.send("No members have giveaway role!");
  }
};

const fetchUsers = message => {
  const membersWithRole = message.guild.roles.get(giveawayRole).members;
  return membersWithRole;
};

module.exports = dittoGiveawayCommands;
