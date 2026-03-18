const alertService = require("../../services/alertService");
const userService = require("../../services/userService");

module.exports = (bot) => {

  // 🔔 Rate Alert Menu
  bot.hears("🔔 Rate Alert", async (ctx) => {

    return ctx.reply(
      "🔔 Select a currency to receive rate alerts:",
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🇺🇸 USD", callback_data: "alert_USD" },
              { text: "🇹🇭 THB", callback_data: "alert_THB" }
            ],
            [
              { text: "🇨🇳 CNY", callback_data: "alert_CNY" }
            ]
          ]
        }
      }
    );

  });


  // 🔔 Create Alert
  bot.action(/alert_(.+)/, async (ctx) => {

    await ctx.answerCbQuery();

    const currency = ctx.match[1];

    // Ensure user exists
    const user = await userService.getOrCreateUser(ctx.from.id);

    await alertService.createAlert(user.id, currency);

    return ctx.reply(
      `🔔 Alert set for *${currency}*.\n\nI will notify you when the rate changes.`,
      { parse_mode: "Markdown" }
    );

  });

};