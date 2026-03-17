const prisma = require("../database/prisma");

async function createUser(ctx) {

  const user = await prisma.user.upsert({
    where: { telegramId: ctx.from.id },
    update: {},
    create: {
      telegramId: ctx.from.id,
      username: ctx.from.username
    }
  });

  return user;
}

module.exports = { createUser };