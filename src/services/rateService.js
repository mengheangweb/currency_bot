const prisma = require("../database/prisma");

// Get all market rates
async function getAllRates() {
  return prisma.marketRate.findMany({
    orderBy: {
      currency: "asc"
    }
  });
}

// Get rate with shop calculations
async function getRate(currency) {

  const marketRate = await prisma.marketRate.findUnique({
    where: { currency }
  });

  if (!marketRate) return null;

  const shops = await prisma.exchangeShop.findMany();

  const shopRates = shops.map((shop) => {

    const buyRate = marketRate.rate + shop.buyMargin;
    const sellRate = marketRate.rate + shop.sellMargin;

    return {
      shop,
      buyRate,
      sellRate
    };

  });

  return {
    currency,
    marketRate: marketRate.rate,
    shops: shopRates
  };

}

module.exports = {
  getAllRates,
  getRate
};