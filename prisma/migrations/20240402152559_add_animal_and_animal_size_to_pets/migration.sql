/*
  Warnings:

  - Added the required column `animal` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animal_size` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "animal" TEXT NOT NULL,
ADD COLUMN     "animal_size" INTEGER NOT NULL;
