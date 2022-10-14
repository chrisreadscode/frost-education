/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Authentication_studentId_key" ON "Authentication"("studentId");
