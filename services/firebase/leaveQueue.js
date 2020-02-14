const db = require("./firebase");
const sendEmbed = require("../discord/sendEmbed");

async function leaveQueue(user, message) {
  const doc = await db.collection("queue").doc(user);
  doc.delete();
  console.log("Removed from queue");
  message.channel.send(
    sendEmbed("", `${message.author.username} removed from queue`)
  );
}

module.exports = leaveQueue;
