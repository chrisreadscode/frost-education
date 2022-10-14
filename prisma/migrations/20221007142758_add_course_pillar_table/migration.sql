/*
  Warnings:

  - You are about to drop the column `pillar` on the `CoursePage` table. All the data in the column will be lost.
  - You are about to drop the `CoursePillars` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pillarId,title]` on the table `CoursePage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pillarId` to the `CoursePage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CoursePage_pillar_title_key";

-- AlterTable
ALTER TABLE "CoursePage" DROP COLUMN "pillar",
ADD COLUMN     "pillarId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CoursePillars";

-- CreateTable
CREATE TABLE "CoursePillar" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "CoursePillar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoursePillar_name_key" ON "CoursePillar"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoursePage_pillarId_title_key" ON "CoursePage"("pillarId", "title");

-- AddForeignKey
ALTER TABLE "CoursePage" ADD CONSTRAINT "CoursePage_pillarId_fkey" FOREIGN KEY ("pillarId") REFERENCES "CoursePillar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
