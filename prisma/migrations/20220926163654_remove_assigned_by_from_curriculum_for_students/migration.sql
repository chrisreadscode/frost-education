/*
  Warnings:

  - You are about to drop the `CurriculumForStudents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CurriculumForStudents" DROP CONSTRAINT "CurriculumForStudents_curriculumId_fkey";

-- DropForeignKey
ALTER TABLE "CurriculumForStudents" DROP CONSTRAINT "CurriculumForStudents_studentId_fkey";

-- DropTable
DROP TABLE "CurriculumForStudents";

-- CreateTable
CREATE TABLE "StudentsOnCurriculum" (
    "curriculumId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "StudentsOnCurriculum_pkey" PRIMARY KEY ("curriculumId","studentId")
);

-- AddForeignKey
ALTER TABLE "StudentsOnCurriculum" ADD CONSTRAINT "StudentsOnCurriculum_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnCurriculum" ADD CONSTRAINT "StudentsOnCurriculum_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
