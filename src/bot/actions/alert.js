const alertService = require("../../services/alertService");

module.exports = (bot) => {

  bot.hears("🔔 Rate Alert", async (ctx) => {

    await ctx.reply(
      "Select currency for alert:",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "USD", callback_data: "alert_USD" }],
            [{ text: "THB", callback_data: "alert_THB" }],
            [{ text: "CNY", callback_data: "alert_CNY" }]
          ]
        }
      }
    );

  });

  bot.action(/alert_(.+)/, async (ctx) => {

    await ctx.answerCbQuery();

    const currency = ctx.match[1];
    const userId = ctx.from.id;

    await alertService.createAlert(userId, currency);

    ctx.reply(`🔔 Alert set for ${currency}. I will notify you when the rate changes.`);
  });

};