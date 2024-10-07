/*
  Warnings:

  - You are about to drop the column `email` on the `Useres` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Personas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Personas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Useres_email_key` ON `Useres`;

-- DropIndex
DROP INDEX `email_index` ON `Useres`;

-- AlterTable
ALTER TABLE `Personas` ADD COLUMN `email` VARCHAR(150) NOT NULL;

-- AlterTable
ALTER TABLE `Useres` DROP COLUMN `email`;

-- CreateIndex
CREATE UNIQUE INDEX `Personas_email_key` ON `Personas`(`email`);

-- CreateIndex
CREATE INDEX `email_index` ON `Personas`(`email`);
