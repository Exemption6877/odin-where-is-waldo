/*
  Warnings:

  - You are about to drop the column `filepath` on the `Gameboard` table. All the data in the column will be lost.
  - Added the required column `img_filepath` to the `Gameboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prev_filepath` to the `Gameboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gameboard" DROP COLUMN "filepath",
ADD COLUMN     "img_filepath" TEXT NOT NULL,
ADD COLUMN     "prev_filepath" TEXT NOT NULL;
