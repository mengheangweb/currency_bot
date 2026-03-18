const prisma = require("../database/prisma");

async function createAlert(userId, currency) {

  return prisma.rateAlert.upsert({
    where: {
      userId_currency: {
        userId: userId,
        currency: currency
      }
    },
    update: {},
    create: {
      userId,
      currency
    }
  });

}

async function getAlertsByCurrency(currency) {

  return prisma.rateAlert.findMany({
    where: { currency },
    include: { user: true }
  });

}

module.exports = {
  createAlert,
  getAlertsByCurrency
};