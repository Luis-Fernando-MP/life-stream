/*
  Warnings:

  - You are about to drop the column `doctorID` on the `Donantes` table. All the data in the column will be lost.
  - You are about to drop the column `doctorID` on the `Receptores` table. All the data in the column will be lost.
  - You are about to drop the column `doctorID` on the `Solicitudes` table. All the data in the column will be lost.
  - You are about to drop the `doctores` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[UserID]` on the table `Donantes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UserID]` on the table `Receptores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserID` to the `Donantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserID` to the `Receptores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Donantes` DROP FOREIGN KEY `Donantes_doctorID_fkey`;

-- DropForeignKey
ALTER TABLE `Receptores` DROP FOREIGN KEY `Receptores_doctorID_fkey`;

-- DropForeignKey
ALTER TABLE `Solicitudes` DROP FOREIGN KEY `Solicitudes_doctorID_fkey`;

-- DropForeignKey
ALTER TABLE `doctores` DROP FOREIGN KEY `doctores_personID_fkey`;

-- AlterTable
ALTER TABLE `Donantes` DROP COLUMN `doctorID`,
    ADD COLUMN `UserID` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `Receptores` DROP COLUMN `doctorID`,
    ADD COLUMN `UserID` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `Solicitudes` DROP COLUMN `doctorID`,
    ADD COLUMN `UserID` VARCHAR(200) NULL;

-- DropTable
DROP TABLE `doctores`;

-- CreateTable
CREATE TABLE `Useres` (
    `id` VARCHAR(200) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `personID` VARCHAR(50) NOT NULL,
    `userRol` ENUM('DONOR', 'RECEIVER', 'MEMBER', 'DOCTOR_ADMIN', 'DOCTOR_MEMBER', 'ADMIN') NULL DEFAULT 'MEMBER',

    UNIQUE INDEX `Useres_email_key`(`email`),
    UNIQUE INDEX `Useres_personID_key`(`personID`),
    INDEX `nameRol_index`(`username`, `userRol`),
    INDEX `email_index`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Donantes_UserID_key` ON `Donantes`(`UserID`);

-- CreateIndex
CREATE UNIQUE INDEX `Receptores_UserID_key` ON `Receptores`(`UserID`);

-- AddForeignKey
ALTER TABLE `Useres` ADD CONSTRAINT `Useres_personID_fkey` FOREIGN KEY (`personID`) REFERENCES `Personas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donantes` ADD CONSTRAINT `Donantes_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Useres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receptores` ADD CONSTRAINT `Receptores_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Useres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Useres`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
