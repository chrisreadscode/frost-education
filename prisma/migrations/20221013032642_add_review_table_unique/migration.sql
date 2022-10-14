/*
  Warnings:

  - A unique constraint covering the columns `[coursePageId,studentId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_coursePageId_studentId_key" ON "Review"("coursePageId", "studentId");
