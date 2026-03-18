const axios = require("axios");
const prisma = require("../database/prisma");

async function updateRates() {

  const response = await axios.get("https://open.er-api.com/v6/latest/USD");

  const rates = response.data.rates;

  const usdToKhr = rates.KHR;

  const currencies = ["USD", "THB", "CNY", "VND", "EUR", "SGD", "MYR"];

  for (const currency of currencies) {

    let rate;

    if (currency === "USD") {
      rate = usdToKhr; // 1 USD = 4036 KHR
    } else {
      const usdToCurrency = rates[currency];
      if (!usdToCurrency) continue;

      rate = usdToKhr / usdToCurrency;
    }

    await prisma.marketRate.upsert({
      where: { currency },
      update: { rate },
      create: {
        currency,
        rate
      }
    });

  }

  console.log("✅ Market rates updated");

}

module.exports = { updateRates };