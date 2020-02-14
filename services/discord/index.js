const Discord = require("discord.js");
const { token } = require("./config.json");

const client = new Discord.Client();

client.login(token);

client.once("ready", () => {
  console.log("Ready!");

  client.user.setActivity("Pokemon Sword and Shield", {
    type: "PLAYING"
  });
});

module.exports = client;
