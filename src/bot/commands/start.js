const { Markup } = require("telegraf");

module.exports = (bot) => {

  bot.start((ctx) => {
    ctx.reply(
      "👋 Welcome to Currency Bot",
      Markup.keyboard([
        [
          Markup.button.callback("💱 Convert", "convert"),
          Markup.button.callback("📊 Rates", "rates")
        ],

        [
          Markup.button.callback("🔔 Rate Alert", "alert"),
          Markup.button.callback("📍 Best Exchange", "shops")
        ],

        [
          Markup.button.callback("📜 History", "history"),
          Markup.button.callback("⚙ Settings", "settings")
        ]
      ])
      .resize()
      .persistent()   // 👈 makes it stay
    );
  });

};