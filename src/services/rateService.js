const prisma = require("../database/prisma");

async function getAllRates() {
  return prisma.rate.findMany({
    include: {
      shop: true
    }
  });
}

async function getRate(currency) {
  return prisma.rate.findFirst({
    where: {
      currency: currency
    },
    include: {
      shop: true
    }
  });
}

module.exports = {
  getAllRates,
  getRate
};