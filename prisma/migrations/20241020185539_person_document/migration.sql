/*
  Warnings:

  - A unique constraint covering the columns `[DNI]` on the table `Pacientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `DNI` to the `Pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pacientes` ADD COLUMN `DNI` VARCHAR(8) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Pacientes_DNI_key` ON `Pacientes`(`DNI`);
