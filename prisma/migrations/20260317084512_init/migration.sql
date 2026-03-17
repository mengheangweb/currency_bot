/*
  Warnings:

  - You are about to drop the `Rate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Rate";

-- CreateTable
CREATE TABLE "rates" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "buyRate" DOUBLE PRECISION NOT NULL,
    "sellRate" DOUBLE PRECISION NOT NULL,
    "shopId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exchange_shops" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "contact" TEXT,
    "telegram" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exchange_shops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rates_currency_idx" ON "rates"("currency");

-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "exchange_shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
