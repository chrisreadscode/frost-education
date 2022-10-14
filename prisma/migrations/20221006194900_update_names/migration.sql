/*
  Warnings:

  - You are about to drop the `Curriculum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CurriculumExample` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentProgressOnCurriculum` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CurriculumExample" DROP CONSTRAINT "CurriculumExample_creatorStudentId_fkey";

-- DropForeignKey
ALTER TABLE "CurriculumExample" DROP CONSTRAINT "CurriculumExample_curriculumId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProgressOnCurriculum" DROP CONSTRAINT "StudentProgressOnCurriculum_curriculumId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProgressOnCurriculum" DROP CONSTRAINT "StudentProgressOnCurriculum_studentId_fkey";

-- DropTable
DROP TABLE "Curriculum";

-- DropTable
DROP TABLE "CurriculumExample";

-- DropTable
DROP TABLE "StudentProgressOnCurriculum";

-- CreateTable
CREATE TABLE "CourseContent" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "lectureLink" TEXT,
    "pageLink" TEXT NOT NULL,
    "positionInSequence" INTEGER NOT NULL,
    "section" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleForTableOfContents" TEXT,

    CONSTRAINT "CourseContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" SERIAL NOT NULL,
    "creatorStudentId" INTEGER NOT NULL,
    "contentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "example" TEXT NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProgress" (
    "contentId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "answer" TEXT,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,

    CONSTRAINT "StudentProgress_pkey" PRIMARY KEY ("contentId","studentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseContent_pageLink_section_title_key" ON "CourseContent"("pageLink", "section", "title");

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_creatorStudentId_fkey" FOREIGN KEY ("creatorStudentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "CourseContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgress" ADD CONSTRAINT "StudentProgress_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "CourseContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgress" ADD CONSTRAINT "StudentProgress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
