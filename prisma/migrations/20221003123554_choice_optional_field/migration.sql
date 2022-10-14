/*
  Warnings:

  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `StudentsOnCurriculum` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `positionInSequence` to the `Curriculum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentsOnCurriculum" DROP CONSTRAINT "StudentsOnCurriculum_curriculumId_fkey";

-- DropForeignKey
ALTER TABLE "StudentsOnCurriculum" DROP CONSTRAINT "StudentsOnCurriculum_studentId_fkey";

-- DropIndex
DROP INDEX "Student_email_key";

-- AlterTable
ALTER TABLE "Curriculum" ADD COLUMN     "content" TEXT,
ADD COLUMN     "lectureLink" TEXT,
ADD COLUMN     "positionInSequence" INTEGER NOT NULL,
ADD COLUMN     "titleForTableOfContents" TEXT;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "email",
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "program" TEXT,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL;

-- DropTable
DROP TABLE "StudentsOnCurriculum";

-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "logoLink" TEXT,
    "name" TEXT NOT NULL,
    "nickname" TEXT,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumExample" (
    "id" SERIAL NOT NULL,
    "creatorStudentId" INTEGER NOT NULL,
    "curriculumId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "example" TEXT NOT NULL,

    CONSTRAINT "CurriculumExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentColleges" (
    "collegeId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "choice" INTEGER,

    CONSTRAINT "StudentColleges_pkey" PRIMARY KEY ("collegeId","studentId")
);

-- CreateTable
CREATE TABLE "StudentProgressOnCurriculum" (
    "curriculumId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "answer" TEXT,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,

    CONSTRAINT "StudentProgressOnCurriculum_pkey" PRIMARY KEY ("curriculumId","studentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_name_key" ON "College"("name");

-- CreateIndex
CREATE UNIQUE INDEX "College_nickname_key" ON "College"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Student_username_key" ON "Student"("username");

-- AddForeignKey
ALTER TABLE "CurriculumExample" ADD CONSTRAINT "CurriculumExample_creatorStudentId_fkey" FOREIGN KEY ("creatorStudentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumExample" ADD CONSTRAINT "CurriculumExample_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentColleges" ADD CONSTRAINT "StudentColleges_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentColleges" ADD CONSTRAINT "StudentColleges_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgressOnCurriculum" ADD CONSTRAINT "StudentProgressOnCurriculum_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgressOnCurriculum" ADD CONSTRAINT "StudentProgressOnCurriculum_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
