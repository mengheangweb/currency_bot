/*
  Warnings:

  - A unique constraint covering the columns `[userId,currency]` on the table `rate_alerts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rate_alerts_userId_currency_key" ON "rate_alerts"("userId", "currency");
