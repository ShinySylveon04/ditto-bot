const config = require("./config.json");
const net = require("net");
const port = 6000;
const host = config.switchIP; // change to switch's IP

const conn = net.createConnection(port, host); // connect

conn.setEncoding("utf-8"); // sends all commands as utf-8 (same as .encode())

module.exports = conn;
