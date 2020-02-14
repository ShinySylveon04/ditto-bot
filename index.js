const { client } = require("./services/discord");
const { prefix, roles } = require("./services/discord/config.json");
const leaveQueue = require("./services/firebase/leaveQueue");
const queue = require("./services/firebase/queue");

const roleCheck = message =>
  message.member.roles.some(r => roles.includes(r.name));

client.on("message", message => {
  if (message.content.startsWith(prefix)) {
    const variable = message.content.split(prefix)[1];

    if (variable === "ding" && roleCheck(message)) {
      message.channel.send("Dong.");
    }

    if (variable === "join") {
      const user = message.author;

      queue(user, message);
    }

    if (variable === "leave") {
      const user = message.author.id;

      leaveQueue(user, message);
    }
  }
});
