/*
  Warnings:

  - You are about to drop the column `disciplinesTeachersId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the `DisciplinesTeachers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teacherDisciplineId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DisciplinesTeachers" DROP CONSTRAINT "DisciplinesTeachers_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "DisciplinesTeachers" DROP CONSTRAINT "DisciplinesTeachers_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_disciplinesTeachersId_fkey";

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "disciplinesTeachersId",
ADD COLUMN     "teacherDisciplineId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "DisciplinesTeachers";

-- CreateTable
CREATE TABLE "teacherDisciplines" (
    "id" SERIAL NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "teacherDisciplines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teacherDisciplines" ADD CONSTRAINT "teacherDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherDisciplines" ADD CONSTRAINT "teacherDisciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "teacherDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
