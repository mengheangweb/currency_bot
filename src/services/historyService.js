const prisma = require("../database/prisma");

async function getUserHistory(userId) {
  return prisma.conversionHistory.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5
  });
}

async function saveHistory(userId, amount, currency, result) {
  return prisma.conversionHistory.create({
    data: {
      userId,
      amount,
      currency,
      result
    }
  });
}

module.exports = {
  getUserHistory,
  saveHistory
};