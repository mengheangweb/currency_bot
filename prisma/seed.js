require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

async function main() {

  const now = new Date();

  // 🏪 Seed Shops
  await prisma.exchangeShop.createMany({
    data: [
      {
        id: 1,
        name: "Ly Hour Exchange",
        location: "Phnom Penh",
        contact: "012 345 678",
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        name: "Wing Exchange",
        location: "Phnom Penh",
        contact: "023 999 888",
        createdAt: now,
        updatedAt: now
      },
      {
        id: 3,
        name: "Central Market Exchange",
        location: "Phsar Thmey",
        contact: "010 222 333",
        createdAt: now,
        updatedAt: now
      }
    ],
    skipDuplicates: true
  });

  // 💱 Seed Rates
  await prisma.rate.createMany({
    data: [

      // Shop 1
      { currency: "USD", buyRate: 4090, sellRate: 4105, shopId: 1, createdAt: now, updatedAt: now },
      { currency: "THB", buyRate: 115, sellRate: 118, shopId: 1, createdAt: now, updatedAt: now },
      { currency: "CNY", buyRate: 560, sellRate: 580, shopId: 1, createdAt: now, updatedAt: now },

      // Shop 2
      { currency: "USD", buyRate: 4085, sellRate: 4098, shopId: 2, createdAt: now, updatedAt: now },
      { currency: "THB", buyRate: 114, sellRate: 117, shopId: 2, createdAt: now, updatedAt: now },
      { currency: "VND", buyRate: 0.16, sellRate: 0.18, shopId: 2, createdAt: now, updatedAt: now },

      // Shop 3
      { currency: "USD", buyRate: 4095, sellRate: 4110, shopId: 3, createdAt: now, updatedAt: now },
      { currency: "THB", buyRate: 116, sellRate: 119, shopId: 3, createdAt: now, updatedAt: now },
      { currency: "EUR", buyRate: 4400, sellRate: 4500, shopId: 3, createdAt: now, updatedAt: now }

    ],
    skipDuplicates: true
  });

  console.log("✅ Shops and Rates seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });