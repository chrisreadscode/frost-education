/*
  Warnings:

  - You are about to drop the column `courseContentId` on the `Example` table. All the data in the column will be lost.
  - The primary key for the `StudentProgress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `courseContentId` on the `StudentProgress` table. All the data in the column will be lost.
  - You are about to drop the `CourseContent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coursePageId` to the `Example` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coursePageId` to the `StudentProgress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_courseContentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProgress" DROP CONSTRAINT "StudentProgress_courseContentId_fkey";

-- AlterTable
ALTER TABLE "Example" DROP COLUMN "courseContentId",
ADD COLUMN     "coursePageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentProgress" DROP CONSTRAINT "StudentProgress_pkey",
DROP COLUMN "courseContentId",
ADD COLUMN     "coursePageId" INTEGER NOT NULL,
ADD CONSTRAINT "StudentProgress_pkey" PRIMARY KEY ("coursePageId", "studentId");

-- DropTable
DROP TABLE "CourseContent";

-- CreateTable
CREATE TABLE "CoursePage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pageContent" TEXT,
    "category" TEXT NOT NULL,
    "positionInSection" INTEGER NOT NULL,
    "pillar" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoLink" TEXT,

    CONSTRAINT "CoursePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoursePillars" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "CoursePillars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoursePage_pillar_title_key" ON "CoursePage"("pillar", "title");

-- CreateIndex
CREATE UNIQUE INDEX "CoursePillars_name_key" ON "CoursePillars"("name");

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgress" ADD CONSTRAINT "StudentProgress_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
