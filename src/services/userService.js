const prisma = require("../database/prisma");

function toBigInt(id) {
  return BigInt(id);
}

async function getOrCreateUser(telegramId, username = null) {
  return prisma.user.upsert({
    where: {
      telegramId: toBigInt(telegramId)
    },
    update: username ? { username } : {},
    create: {
      telegramId: toBigInt(telegramId),
      username
    }
  });
}

async function updateDefaultCurrency(telegramId, currency) {
  return prisma.user.update({
    where: {
      telegramId: toBigInt(telegramId)
    },
    data: {
      defaultCurrency: currency
    }
  });
}

async function updateAlertSetting(telegramId, enabled) {
  return prisma.user.update({
    where: {
      telegramId: toBigInt(telegramId)
    },
    data: {
      alertsEnabled: enabled
    }
  });
}

module.exports = {
  getOrCreateUser,
  updateDefaultCurrency,
  updateAlertSetting
};