-- CreateTable
CREATE TABLE "ConversionHistory" (
    "id" SERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "result" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversionHistory_pkey" PRIMARY KEY ("id")
);
