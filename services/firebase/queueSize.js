const db = require("./firebase");

async function queueSize() {
  const snapshot = await db.collection("queue").get();
  const size = snapshot.size;
  return size;
}

module.exports = queueSize;
