/*
  Warnings:

  - You are about to drop the column `courseContent` on the `CourseContent` table. All the data in the column will be lost.
  - You are about to drop the column `lectureLink` on the `CourseContent` table. All the data in the column will be lost.
  - You are about to drop the column `pageLink` on the `CourseContent` table. All the data in the column will be lost.
  - You are about to drop the column `positionInSequence` on the `CourseContent` table. All the data in the column will be lost.
  - You are about to drop the column `titleForTableOfContents` on the `CourseContent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[section,title]` on the table `CourseContent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `positionInSection` to the `CourseContent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CourseContent_pageLink_section_title_key";

-- AlterTable
ALTER TABLE "CourseContent" DROP COLUMN "courseContent",
DROP COLUMN "lectureLink",
DROP COLUMN "pageLink",
DROP COLUMN "positionInSequence",
DROP COLUMN "titleForTableOfContents",
ADD COLUMN     "articleContent" TEXT,
ADD COLUMN     "positionInSection" INTEGER NOT NULL,
ADD COLUMN     "videoLink" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CourseContent_section_title_key" ON "CourseContent"("section", "title");
