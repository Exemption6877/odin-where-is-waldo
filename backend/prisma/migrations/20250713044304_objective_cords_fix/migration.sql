/*
  Warnings:

  - You are about to drop the column `BottomRightX` on the `Objective` table. All the data in the column will be lost.
  - You are about to drop the column `BottomRightY` on the `Objective` table. All the data in the column will be lost.
  - Added the required column `bottomRightX` to the `Objective` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bottomRightY` to the `Objective` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Objective" DROP COLUMN "BottomRightX",
DROP COLUMN "BottomRightY",
ADD COLUMN     "bottomRightX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bottomRightY" DOUBLE PRECISION NOT NULL;
