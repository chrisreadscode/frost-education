/*
  Warnings:

  - You are about to drop the column `content` on the `CourseContent` table. All the data in the column will be lost.
  - You are about to drop the column `contentId` on the `Example` table. All the data in the column will be lost.
  - The primary key for the `StudentProgress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contentId` on the `StudentProgress` table. All the data in the column will be lost.
  - Added the required column `courseContentId` to the `Example` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseContentId` to the `StudentProgress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_contentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProgress" DROP CONSTRAINT "StudentProgress_contentId_fkey";

-- AlterTable
ALTER TABLE "CourseContent" DROP COLUMN "content",
ADD COLUMN     "courseContent" TEXT;

-- AlterTable
ALTER TABLE "Example" DROP COLUMN "contentId",
ADD COLUMN     "courseContentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentProgress" DROP CONSTRAINT "StudentProgress_pkey",
DROP COLUMN "contentId",
ADD COLUMN     "courseContentId" INTEGER NOT NULL,
ADD CONSTRAINT "StudentProgress_pkey" PRIMARY KEY ("courseContentId", "studentId");

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_courseContentId_fkey" FOREIGN KEY ("courseContentId") REFERENCES "CourseContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgress" ADD CONSTRAINT "StudentProgress_courseContentId_fkey" FOREIGN KEY ("courseContentId") REFERENCES "CourseContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
