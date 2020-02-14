const db = require("./firebase");

const mapFirebase = (collection, func) => {
  const result = [];

  collection.forEach((datum, index) => result.push(func(datum, index)));

  return result;
};

async function getUser() {
  const docs = await db
    .collection("queue")
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();
  const ids = mapFirebase(docs, doc => doc.id);
  return ids[0];
}

module.exports = getUser;
