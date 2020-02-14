const db = require("./firebase");
const queueSize = require("./queueSize");
const sendEmbed = require("../discord/sendEmbed");
const checkQueue = require("../../util/checkQueue");

async function addToQueue(user, message) {
  const timestamp = {
    createdAt: new Date().toISOString()
  };

  const doc = await db
    .collection("queue")
    .doc(user)
    .set(timestamp);
  const size = await queueSize();
  console.log("Added to queue");
  message.channel.send(
    sendEmbed(
      `${message.author.username} joined queue`,
      `${size} ${size === 1 ? "person" : "people"} in line`
    )
  );
  checkQueue();
}

module.exports = addToQueue;
