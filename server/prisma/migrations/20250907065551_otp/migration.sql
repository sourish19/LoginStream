/*
  Warnings:

  - You are about to drop the column `emailVerificationToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationTokenExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordTokenExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "emailVerificationToken",
DROP COLUMN "emailVerificationTokenExpiry",
DROP COLUMN "resetPasswordToken",
DROP COLUMN "resetPasswordTokenExpiry",
DROP COLUMN "username",
ADD COLUMN     "emailVerificationOtp" TEXT,
ADD COLUMN     "emailVerificationOtpExpiry" TIMESTAMP(3),
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "resetPasswordOtp" TEXT,
ADD COLUMN     "resetPasswordOtpExpiry" TIMESTAMP(3);
