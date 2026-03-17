const rateService = require("../../services/rateService");
const exchangeService = require("../../services/exchangeService");

module.exports = (bot) => {

  // 📊 Show all rates
 bot.hears("📊 Rates", async (ctx) => {
    const rates = await rateService.getAllRates();

    let message = "💱 Exchange Rates\n\n";

    rates.forEach((rate) => {
      message += `💵 ${rate.currency}\n`;
      message += `Buy: ${rate.buyRate} KHR\n`;
      message += `Sell: ${rate.sellRate} KHR\n\n`;
    });

    ctx.reply(message);
  });

// 💱 Convert button
bot.hears("💱 Convert", (ctx) => {
  ctx.reply("Send amount like:\n\n10 USD\n40000 KHR");
});

// 🏪 Shops / Best Rates
bot.hears("📍 Best Exchange", async (ctx) => {

  const shops = await exchangeService.getBestShops();

  if (!shops.length) {
    return ctx.reply("❌ No exchange shops available.");
  }

  let message = "🏆 *Best Exchange Rates Today*\n\n";

  shops.forEach((s) => {
    message +=
      `🏪 *${s.shop.name}*\n` +
      `💵 Buy: ${s.buyRate} KHR\n` +
      `💰 Sell: ${s.sellRate} KHR\n` +
      `📍 ${s.shop.location}\n` +
      `📞 ${s.shop.contact || "N/A"}\n\n`;
  });

  ctx.reply(message, { parse_mode: "Markdown" });
});

// 🔔 Rate Alert
bot.hears("🔔 Rate Alert", async (ctx) => {

  ctx.reply(
    "🔔 Select currency to receive alerts:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🇺🇸 USD", callback_data: "alert_USD" },
            { text: "🇹🇭 THB", callback_data: "alert_THB" }
          ],
          [
            { text: "🇨🇳 CNY", callback_data: "alert_CNY" },
            { text: "🇻🇳 VND", callback_data: "alert_VND" }
          ]
        ]
      }
    }
  );

});


  // 📜 History
  bot.action("history", (ctx) => {
    ctx.answerCbQuery();
    ctx.reply("📜 Your conversion history");
  });

  // ⚙ Settings
  bot.action("settings", (ctx) => {
    ctx.answerCbQuery();
    ctx.reply("⚙ Bot settings");
  });

};