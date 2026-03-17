const prisma = require("../database/prisma");

async function createAlert(userId, currency) {
  return prisma.rateAlert.create({
    data: {
      userId: BigInt(userId),
      currency
    }
  });
}

async function getUserAlerts(userId) {
  return prisma.rateAlert.findMany({
    where: {
      userId: BigInt(userId)
    }
  });
}

module.exports = {
  createAlert,
  getUserAlerts
};