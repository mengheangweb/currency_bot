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

    const message = `
💱 *${currency} Exchange Rate*

━━━━━━━━━━━━━━

💵 *Buy Rate*  
${rate.buyRate.toLocaleString()} KHR

💰 *Sell Rate*  
${rate.sellRate.toLocaleString()} KHR

━━━━━━━━━━━━━━
`;

    await ctx.reply(message, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🔔 Set Alert", callback_data: `alert_${currency}` }
          ],
          [
            { text: "⬅ Back to Rates", callback_data: "show_rates" }
          ]
        ]
      }
    });

  });

};