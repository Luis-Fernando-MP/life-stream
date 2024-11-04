/*
  Warnings:

  - A unique constraint covering the columns `[DNI]` on the table `Doctores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `DNI` to the `Doctores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Doctores` ADD COLUMN `DNI` VARCHAR(8) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Doctores_DNI_key` ON `Doctores`(`DNI`);
