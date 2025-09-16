-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "token" TEXT,
ADD COLUMN     "tokenExpiry" TIMESTAMP(3);
