//click A/B/X/Y/LSTICK/RSTICK/L/R/ZL/ZR/PLUS/MINUS/DLEFT/DUP/DDOWN/DRIGHT/HOME/CAPTURE
//press A/B/X/Y/LSTICK/RSTICK/L/R/ZL/ZR/PLUS/MINUS/DLEFT/DUP/DDOWN/DRIGHT/HOME/CAPTURE
//release A/B/X/Y/LSTICK/RSTICK/L/R/ZL/ZR/PLUS/MINUS/DLEFT/DUP/DDOWN/DRIGHT/HOME/CAPTURE

const conn = require("./index");

const A = () => conn.write("click A \r\n");
const B = () => conn.write("click B \r\n");
const X = () => conn.write("click X \r\n");
const Y = () => conn.write("click Y \r\n");
const DDown = () => conn.write("click DDOWN \r\n");
const DUp = () => conn.write("click DUP \r\n");
const DRight = () => conn.write("click DRIGHT \r\n");
const DLeft = () => conn.write("click DLEFT \r\n");
const Plus = () => conn.write("click PLUS \r\n");
const Minus = () => conn.write("click MINUS \r\n");

module.exports = { A, B, X, Y, DDown, DUp, DRight, DLeft, Plus, Minus };
