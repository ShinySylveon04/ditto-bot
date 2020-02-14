const db = require("./firebase");
const queueSize = require("./queueSize");
const addToQueue = require("./addToQueue");
const sendEmbed = require("../discord/sendEmbed");

async function queue(user, message) {
  const doc = await db
    .collection("queue")
    .doc(user.id)
    .get();
  const size = await queueSize();

  if (doc.exists) {
    console.log("Already in queue");
    message.channel.send(
      sendEmbed("", `${user} you are already in the queue!`)
    );
  } else {
    if (size > 20) {
      message.channel.send(
        sendEmbed("Queue is full!", "Wait until queue is emptied to join.")
      );
    } else {
      addToQueue(user.id, message);
    }
  }
}

module.exports = queue;
