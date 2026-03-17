require("dotenv").config();

const createBot = require("./bot/bot");

const bot = createBot(process.env.BOT_TOKEN);

bot.launch();

console.log("Telegram bot running 🚀");