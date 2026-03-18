const alertService = require("../../services/alertService");
const userService = require("../../services/userService");

module.exports = (bot) => {

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


  bot.action(/alert_(.+)/, async (ctx) => {

    await ctx.answerCbQuery();

    const currency = ctx.match[1];

    const user = await userService.getOrCreateUser(
      ctx.from.id,
      ctx.from.username
    );

    await alertService.createAlert(user.id, currency);

    await ctx.reply(
      `🔔 Alert enabled for *${currency}*.\n\nYou will be notified when the rate changes.`,
      { parse_mode: "Markdown" }
    );

  });

};