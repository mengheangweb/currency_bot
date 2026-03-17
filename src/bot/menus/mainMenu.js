const { Markup } = require("telegraf");

function mainMenu() {

  return Markup.inlineKeyboard([

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

  ]);

}

module.exports = mainMenu;