/*
  Warnings:

  - You are about to drop the `Conversion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConversionHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RateAlert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conversion" DROP CONSTRAINT "Conversion_userId_fkey";

-- DropTable
DROP TABLE "Conversion";

-- DropTable
DROP TABLE "ConversionHistory";

-- DropTable
DROP TABLE "RateAlert";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "defaultCurrency" TEXT NOT NULL DEFAULT 'USD',
    "alertsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "preferredShopId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fromCurrency" TEXT NOT NULL,
    "toCurrency" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "result" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversion_history" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "result" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversion_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_alerts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "targetRate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rate_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

-- AddForeignKey
ALTER TABLE "conversions" ADD CONSTRAINT "conversions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversion_history" ADD CONSTRAINT "conversion_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_alerts" ADD CONSTRAINT "rate_alerts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
