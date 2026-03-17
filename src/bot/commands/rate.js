const rateService = require("../../services/rateService");

module.exports = (bot) => {

  bot.action(/rate_(.+)/, async (ctx) => {
    await ctx.answerCbQuery();

    const currency = ctx.match[1];

    const rate = await rateService.getRate(currency);

    if (!rate) {
      return ctx.reply(`❌ ${currency} rate not set yet.`);
    }

    ctx.reply(
`💱 ${currency} → KHR

💵 Buy: ${rate.buyRate} KHR
💰 Sell: ${rate.sellRate} KHR`
    );
  });

};