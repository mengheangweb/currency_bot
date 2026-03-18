/*
  Warnings:

  - You are about to drop the `MarketRate` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "exchange_shops" ADD COLUMN     "buyMargin" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sellMargin" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "MarketRate";

-- CreateTable
CREATE TABLE "market_rates" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "market_rates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "market_rates_currency_key" ON "market_rates"("currency");
