const rateService = require("../../services/rateService");
const parseCurrency = require("../../utils/parseCurrency");

module.exports = (bot) => {

  bot.hears(/(.+)/, async (ctx) => {
    try {

      const parsed = parseCurrency(ctx.message.text);
      if (!parsed) return;

      const { amount, currency } = parsed;

      // 💵 Foreign → KHR
      if (currency !== "KHR") {

        const rate = await rateService.getRate(currency);

        if (!rate) {
          return ctx.reply(`❌ ${currency} rate not available.`);
        }

        const result = amount * rate.sellRate;

        return ctx.reply(
          `💱 *Conversion*\n\n${amount} ${currency} = ${result.toLocaleString()} KHR`,
          { parse_mode: "Markdown" }
        );
      }

      // 🇰🇭 KHR → ALL
      const rates = await rateService.getAllRates();

      if (!rates.length) {
        return ctx.reply("❌ No exchange rates available.");
      }

      const flags = {
        USD: "🇺🇸",
        THB: "🇹🇭",
        CNY: "🇨🇳",
        VND: "🇻🇳",
        EUR: "🇪🇺",
        SGD: "🇸🇬",
        MYR: "🇲🇾"
      };

      let message = `💱 *Conversion*\n\n${amount.toLocaleString()} KHR ≈\n\n`;

      rates.forEach((r) => {

        const result = amount / r.sellRate;

        message += `${flags[r.currency] || "💵"} ${r.currency}: ${result.toFixed(2)}\n`;

      });

      return ctx.reply(message, { parse_mode: "Markdown" });

    } catch (err) {
      console.error(err);
    }
  });

};