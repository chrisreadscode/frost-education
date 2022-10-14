/*
  Warnings:

  - A unique constraint covering the columns `[id,coursePageId,studentId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Review_coursePageId_studentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_coursePageId_studentId_key" ON "Review"("id", "coursePageId", "studentId");
