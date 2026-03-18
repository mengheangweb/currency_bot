const axios = require("axios");
const prisma = require("../database/prisma");
const alertService = require("../services/alertService");

const CURRENCIES = ["USD", "THB", "CNY", "VND", "EUR", "SGD", "MYR"];
const ALERT_THRESHOLD = 5; // notify if change >= 5 KHR

async function updateRates(bot) {
  try {

    // Fetch latest rates
    const { data } = await axios.get("https://open.er-api.com/v6/latest/USD");
    const rates = data.rates;

    const usdToKhr = rates.KHR;

    if (!usdToKhr) {
      console.log("⚠️ KHR rate missing from API");
      return;
    }

    for (const currency of CURRENCIES) {

      let newRate;

      if (currency === "USD") {
        newRate = usdToKhr;
      } else {

        const usdToCurrency = rates[currency];
        if (!usdToCurrency) {
          console.log(`⚠️ Missing rate for ${currency}`);
          continue;
        }

        newRate = usdToKhr / usdToCurrency;

      }

      newRate = Number(newRate.toFixed(2));

      // Get existing rate
      const existingRate = await prisma.marketRate.findUnique({
        where: { currency }
      });

      // Create rate if not exist
      if (!existingRate) {

        await prisma.marketRate.create({
          data: { currency, rate: newRate }
        });

        console.log(`✅ Created rate for ${currency}: ${newRate}`);
        continue;
      }

      const oldRate = existingRate.rate;

      // Update rate
      await prisma.marketRate.update({
        where: { currency },
        data: { rate: newRate }
      });

      // Check if change is significant
      const rateDifference = Math.abs(newRate - oldRate);

      if (rateDifference >= ALERT_THRESHOLD) {

        console.log(`🔔 ${currency} changed ${oldRate} → ${newRate}`);

        const alerts = await alertService.getAlertsByCurrency(currency);

        if (!alerts.length) continue;

        for (const alert of alerts) {

          if (!alert?.user?.telegramId) continue;

          try {

            await bot.telegram.sendMessage(
                alert.user.telegramId.toString(),
                `🔔 *${currency} Rate Updated*\n\n` +
                `Old Rate: ${oldRate.toLocaleString()} KHR\n` +
                `New Rate: ${newRate.toLocaleString()} KHR`,
                { parse_mode: "Markdown" }
                );

          } catch (err) {

            console.log(
              `❌ Failed to send alert to ${alert.user.telegramId}:`,
              err.message
            );

          }

        }

      }

    }

    console.log("✅ Market rates updated successfully");

  } catch (error) {

    console.error("❌ Rate update failed:", error.message);

  }
}

module.exports = { updateRates };