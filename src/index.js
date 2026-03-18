require("dotenv").config();

const createBot = require("./bot/bot");
const cron = require("node-cron");
const { updateRates } = require("./services/autoRateService");

async function start() {
  try {
    const bot = createBot(process.env.BOT_TOKEN);

    // Run once when server starts
    console.log("Updating exchange rates at startup...");
    await updateRates(bot);

    // Run every 1 minute
    cron.schedule("*/30 * * * *", async () => {
      console.log("Updating exchange rates...");
      await updateRates(bot);
    });

    await bot.launch();

    console.log("Telegram bot running 🚀");

  } catch (error) {
    console.error("Bot startup error:", error);
  }
}

start();