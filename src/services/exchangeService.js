const prisma = require("../database/prisma");

async function getBestShops() {
  return prisma.rate.findMany({
    where: {
      currency: "USD"
    },
    orderBy: {
      sellRate: "desc"
    },
    take: 5,
    include: {
      shop: true
    }
  });
}

module.exports = {
  getBestShops
};