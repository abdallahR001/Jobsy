/*
  Warnings:

  - You are about to drop the `inConsideration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notSelected` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `viewed` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "application" ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "inConsideration";

-- DropTable
DROP TABLE "notSelected";

-- DropTable
DROP TABLE "viewed";
