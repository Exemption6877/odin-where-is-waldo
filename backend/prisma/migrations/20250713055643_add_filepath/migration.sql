/*
  Warnings:

  - Added the required column `filepath` to the `Gameboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gameboard" ADD COLUMN     "filepath" TEXT NOT NULL;
