/*
  Warnings:

  - You are about to drop the column `section` on the `CourseContent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pillar,title]` on the table `CourseContent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pillar` to the `CourseContent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CourseContent_section_title_key";

-- AlterTable
ALTER TABLE "CourseContent" DROP COLUMN "section",
ADD COLUMN     "pillar" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourseContent_pillar_title_key" ON "CourseContent"("pillar", "title");
