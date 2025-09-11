/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "refreshToken",
ADD COLUMN     "tokenVersion" INTEGER NOT NULL DEFAULT 1;
