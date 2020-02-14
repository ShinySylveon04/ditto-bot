const db = require("./firebase");

async function removeFromQueue(user) {
  const doc = await db.collection("queue").doc(user);
  doc.delete();
  console.log("Removed from queue");
}

module.exports = removeFromQueue;
