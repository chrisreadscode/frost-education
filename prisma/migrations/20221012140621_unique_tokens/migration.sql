/*
  Warnings:

  - A unique constraint covering the columns `[accessToken]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refreshToken]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Authentication_accessToken_key" ON "Authentication"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_refreshToken_key" ON "Authentication"("refreshToken");
