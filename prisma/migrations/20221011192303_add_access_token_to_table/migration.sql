/*
  Warnings:

  - Added the required column `accessToken` to the `Authentication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Authentication" ADD COLUMN     "accessToken" TEXT NOT NULL;
