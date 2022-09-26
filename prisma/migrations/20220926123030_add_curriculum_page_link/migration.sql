/*
  Warnings:

  - Added the required column `pageLink` to the `Curriculum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curriculum" ADD COLUMN     "pageLink" TEXT NOT NULL;
