/*
  Warnings:

  - You are about to drop the column `expirest` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth"."Session" DROP COLUMN "expirest",
ADD COLUMN     "expiresAt" TIMESTAMP(3);
