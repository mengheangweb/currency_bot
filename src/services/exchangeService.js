const prisma = require("../database/prisma");

async function getBestShops() {

  // get market rate
  const marketRate = await prisma.marketRate.findUnique({
    where: { currency: "USD" }
  });

  if (!marketRate) return [];

  // get all shops
  const shops = await prisma.exchangeShop.findMany();

  // calculate shop rates
  const results = shops.map((shop) => {

    const buyRate = marketRate.rate - shop.buyMargin;
    const sellRate = marketRate.rate + shop.sellMargin;

    return {
      shop,
      buyRate,
      sellRate
    };

  });

  // sort by best buy rate
  results.sort((a, b) => b.buyRate - a.buyRate);

  return results.slice(0, 5);
}

module.exports = {
  getBestShops
};