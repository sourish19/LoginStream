/*
  Warnings:

  - You are about to drop the column `emailVerificationExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "emailVerificationExpiry",
ADD COLUMN     "emailVerificationTokenExpiry" TIMESTAMP(3);
