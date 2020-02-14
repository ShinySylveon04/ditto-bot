const botStatus = {
  searching: false,
  lastUse: new Date().getTime(),
  oldData: Buffer.from([]),
  started: true,
  tradeStart: new Date().getTime(),
  linkCode: "0316",
  isQueue: false,
  user: ""
};

module.exports = botStatus;
