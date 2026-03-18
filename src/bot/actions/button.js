const rateService = require("../../services/rateService");
const exchangeService = require("../../services/exchangeService");
const historyService = require("../../services/historyService");
const userService = require("../../services/userService");

module.exports = (bot) => {

// 📊 Show Exchange Rates
bot.hears("📊 Rates", async (ctx) => {

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

  let message = `💱 *Live Exchange Rates*\n`;
  message += `━━━━━━━━━━━━━━\n\n`;

  rates.forEach((r) => {
    message += `${flags[r.currency] || "💵"} *${r.currency}* — ${r.buyRate.toLocaleString()} KHR\n`;
  });

  // 2 buttons per row
  const keyboard = [];

  for (let i = 0; i < rates.length; i += 2) {

    const row = [
      {
        text: `${flags[rates[i].currency]} ${rates[i].currency}`,
        callback_data: `rate_${rates[i].currency}`
      }
    ];

    if (rates[i + 1]) {
      row.push({
        text: `${flags[rates[i + 1].currency]} ${rates[i + 1].currency}`,
        callback_data: `rate_${rates[i + 1].currency}`
      });
    }

    keyboard.push(row);
  }

  await ctx.reply(message, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: keyboard
    }
  });

});

  // 💱 Convert
  bot.hears("💱 Convert", (ctx) => {
    ctx.reply("Send amount like:\n\n10 USD\n40000 KHR");
  });

  // 📍 Best Exchange Shops
  bot.hears("📍 Best Exchange", async (ctx) => {

    const shops = await exchangeService.getBestShops();

    if (!shops.length) {
      return ctx.reply("❌ No exchange shops available.");
    }

    const message = shops.map((s) =>
      `🏪 *${s.shop.name}*\n` +
      `💵 Buy: ${s.buyRate} KHR\n` +
      `💰 Sell: ${s.sellRate} KHR\n` +
      `📍 ${s.shop.location}\n` +
      `📞 ${s.shop.contact || "N/A"}`
    ).join("\n\n");

    ctx.reply(`🏆 *Best Exchange Rates Today*\n\n${message}`, {
      parse_mode: "Markdown"
    });

  });

  // 🔔 Rate Alert
  bot.hears("🔔 Rate Alert", (ctx) => {

    ctx.reply("🔔 Select currency to receive alerts:", {
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
    });

  });

  // 📜 History
bot.hears("📜 History", async (ctx) => {

  const user = await userService.getOrCreateUser(ctx.from.id);

  const history = await historyService.getUserHistory(user.id);

  if (!history.length) {
    return ctx.reply("📜 No conversion history yet.");
  }

  let message = "📜 *Your Last Conversions*\n\n";

  history.forEach((h, i) => {
    message += `${i + 1}. ${h.amount} ${h.currency} → ${h.result}\n`;
  });

  ctx.reply(message, { parse_mode: "Markdown" });

});

  // ⚙ Settings
  bot.hears("⚙ Settings", (ctx) => {

    ctx.reply("⚙ *Bot Settings*\n\nSelect what you want to configure:", {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "💱 Default Currency", callback_data: "set_currency" }],
          [{ text: "🔔 Rate Alerts", callback_data: "set_alerts" }],
          [{ text: "🏪 Preferred Exchange Shop", callback_data: "set_shop" }]
        ]
      }
    });

  });

  // 💱 Currency Settings
  bot.action("set_currency", async (ctx) => {

    await ctx.answerCbQuery();

    ctx.reply("Select your default currency:", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "USD", callback_data: "currency_USD" },
            { text: "KHR", callback_data: "currency_KHR" }
          ],
          [
            { text: "THB", callback_data: "currency_THB" },
            { text: "CNY", callback_data: "currency_CNY" }
          ]
        ]
      }
    });

  });

  bot.action(/currency_(.+)/, async (ctx) => {

    await ctx.answerCbQuery();

    const currency = ctx.match[1];

    await userService.getOrCreateUser(ctx.from.id);
    await userService.updateDefaultCurrency(ctx.from.id, currency);

    ctx.reply(`✅ Default currency set to ${currency}`);

  });

    // 🔔 Alert Settings Menu
  bot.action("set_alerts", async (ctx) => {

    await ctx.answerCbQuery();

    return ctx.reply("🔔 Manage alerts:", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🔔 Enable Alerts", callback_data: "alerts_on" },
            { text: "🔕 Disable Alerts", callback_data: "alerts_off" }
          ]
        ]
      }
    });

  });


  // 🔔 Toggle Alerts
  bot.action(/alerts_(on|off)/, async (ctx) => {

    await ctx.answerCbQuery();

    const enabled = ctx.match[1] === "on";

    // Ensure user exists
    await userService.getOrCreateUser(ctx.from.id);

    await userService.updateAlertSetting(ctx.from.id, enabled);

    return ctx.reply(
      enabled ? "🔔 Alerts enabled" : "🔕 Alerts disabled"
    );

  });


  // 🏪 Preferred Shop
  bot.action("set_shop", async (ctx) => {

    await ctx.answerCbQuery();

    ctx.reply("🏪 Preferred shop feature coming soon.");

  });

};