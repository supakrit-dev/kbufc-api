/*
  Warnings:

  - You are about to drop the column `expires` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth"."Session" DROP COLUMN "expires",
ADD COLUMN     "expirest" TIMESTAMP(3);
