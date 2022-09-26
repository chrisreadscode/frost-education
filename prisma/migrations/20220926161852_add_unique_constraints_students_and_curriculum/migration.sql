/*
  Warnings:

  - A unique constraint covering the columns `[pageLink,section,title]` on the table `Curriculum` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Curriculum_pageLink_section_title_key" ON "Curriculum"("pageLink", "section", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
