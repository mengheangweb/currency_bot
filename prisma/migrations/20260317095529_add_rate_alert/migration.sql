-- CreateTable
CREATE TABLE "RateAlert" (
    "id" SERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "targetRate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RateAlert_pkey" PRIMARY KEY ("id")
);
