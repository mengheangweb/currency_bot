const rateService = require("../../services/rateService");
const parseCurrency = require("../../utils/parseCurrency");
const historyService = require("../../services/historyService");
const userService = require("../../services/userService");

module.exports = (bot) => {

  bot.hears(/(.+)/, async (ctx) => {

    try {

      const text = ctx.message.text;

      const parsed = parseCurrency(text);
      if (!parsed) return;

      const { amount, currency } = parsed;

      // Ensure user exists
      const user = await userService.getOrCreateUser(
        ctx.from.id,
        ctx.from.username
      );

      // 💵 Foreign Currency → KHR
      if (currency !== "KHR") {

        const rate = await rateService.getRate(currency);

        if (!rate) {
          return ctx.reply(`❌ ${currency} rate not available.`);
        }

        const result = amount * rate.sellRate;

        await historyService.saveHistory(
          user.id,
          amount,
          currency,
          result
        );

        return ctx.reply(
          `💱 *Conversion*\n\n${amount} ${currency} = ${result.toLocaleString()} KHR`,
          { parse_mode: "Markdown" }
        );

      }

      // 🇰🇭 KHR → Other Currencies
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

      for (const rate of rates) {

        const result = amount / rate.sellRate;

        message += `${flags[rate.currency] || "💵"} ${rate.currency}: ${result.toFixed(2)}\n`;

      }

      await historyService.saveHistory(
        user.id,
        amount,
        currency,
        amount
      );

      return ctx.reply(message, {
        parse_mode: "Markdown"
      });

    } catch (error) {

      console.error("Conversion Error:", error);
      ctx.reply("⚠️ Something went wrong while converting.");

    }

  });

};