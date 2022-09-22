/*
  Warnings:

  - You are about to drop the column `createdAt` on the `CurriculumForStudents` table. All the data in the column will be lost.
  - Added the required column `assignedBy` to the `CurriculumForStudents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurriculumForStudents" DROP COLUMN "createdAt",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "assignedBy" TEXT NOT NULL;
