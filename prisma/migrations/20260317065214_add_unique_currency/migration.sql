/*
  Warnings:

  - A unique constraint covering the columns `[currency]` on the table `Rate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Rate" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Rate_currency_key" ON "Rate"("currency");
