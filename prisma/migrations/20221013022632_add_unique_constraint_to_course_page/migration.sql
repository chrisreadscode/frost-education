/*
  Warnings:

  - A unique constraint covering the columns `[pillarId,positionInSection]` on the table `CoursePage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CoursePage_pillarId_positionInSection_key" ON "CoursePage"("pillarId", "positionInSection");
