/*
  Warnings:

  - You are about to drop the column `termID` on the `disciplines` table. All the data in the column will be lost.
  - Added the required column `termId` to the `disciplines` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "disciplines" DROP CONSTRAINT "disciplines_termID_fkey";

-- AlterTable
ALTER TABLE "disciplines" DROP COLUMN "termID",
ADD COLUMN     "termId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
