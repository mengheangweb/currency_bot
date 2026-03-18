const rateService = require("../../services/rateService");

module.exports = (bot) => {

  bot.action(/rate_(.+)/, async (ctx) => {

    await ctx.answerCbQuery();

    const currency = ctx.match[1];

    const rate = await rateService.getRate(currency);

    if (!rate) {
      return ctx.reply(`❌ *${currency} rate not available yet.*`, {
        parse_mode: "Markdown"
      });
    }

    let message = `💱 *${currency} Exchange Rate*\n`;
    message += `━━━━━━━━━━━━━━\n\n`;

    message += `🌐 *Market Rate*\n`;
    message += `${rate.marketRate.toLocaleString()} KHR\n\n`;

    if (rate.shops.length) {

      message += `🏪 *Exchange Shops*\n\n`;

      rate.shops.slice(0, 5).forEach((s) => {

        message += `*${s.shop.name}*\n`;
        message += `💵 Buy : ${s.buyRate.toLocaleString()} KHR\n`;
        message += `💰 Sell: ${s.sellRate.toLocaleString()} KHR\n\n`;

      });

    }

    message += `━━━━━━━━━━━━━━`;

    await ctx.reply(message, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔔 Set Alert", callback_data: `alert_${currency}` }],
          [{ text: "⬅ Back to Rates", callback_data: "show_rates" }]
        ]
      }
    });

  });

  bot.action("show_rates", async (ctx) => {

  await ctx.answerCbQuery();

  return ctx.reply(
    "💱 Select a currency:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🇺🇸 USD", callback_data: "rate_USD" },
            { text: "🇹🇭 THB", callback_data: "rate_THB" }
          ],
          [
            { text: "🇨🇳 CNY", callback_data: "rate_CNY" },
            { text: "🇻🇳 VND", callback_data: "rate_VND" }
          ],
          [
            { text: "🇪🇺 EUR", callback_data: "rate_EUR" },
            { text: "🇸🇬 SGD", callback_data: "rate_SGD" }
          ]
        ]
      }
    }
  );

});

};