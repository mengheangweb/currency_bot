const { Telegraf } = require("telegraf");

const start = require("./commands/start");
const rate = require("./commands/rate");
const buttons = require("./actions/button");
const convert = require("./hears/convert");
const alert = require("./actions/alert"); // 👈 add this

function createBot(token) {

  const bot = new Telegraf(token);

  start(bot);
  rate(bot);
  buttons(bot);
  convert(bot);
  alert(bot); // 👈 register alert handlers

  return bot;
}

module.exports = createBot;