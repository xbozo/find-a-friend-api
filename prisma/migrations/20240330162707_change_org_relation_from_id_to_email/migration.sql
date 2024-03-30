/*
  Warnings:

  - You are about to drop the column `org_id` on the `pets` table. All the data in the column will be lost.
  - Added the required column `org_email` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_org_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "org_id",
ADD COLUMN     "org_email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_email_fkey" FOREIGN KEY ("org_email") REFERENCES "orgs"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
