/*
  Warnings:

  - You are about to drop the column `bloodRequestID` on the `Donaciones` table. All the data in the column will be lost.
  - You are about to drop the column `UserID` on the `Donantes` table. All the data in the column will be lost.
  - You are about to drop the column `UserID` on the `Receptores` table. All the data in the column will be lost.
  - You are about to drop the column `UserID` on the `Solicitudes` table. All the data in the column will be lost.
  - You are about to drop the column `bloodDonorID` on the `Solicitudes` table. All the data in the column will be lost.
  - You are about to drop the column `bloodReceiverID` on the `Solicitudes` table. All the data in the column will be lost.
  - You are about to alter the column `fulfilled` on the `Solicitudes` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(4))`.
  - You are about to drop the column `userRol` on the `Useres` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Useres` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[AuthorID]` on the table `Donantes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[AuthorID]` on the table `Receptores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AuthorID` to the `Donantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Personas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AuthorID` to the `Receptores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Donaciones` DROP FOREIGN KEY `Donaciones_bloodRequestID_fkey`;

-- DropForeignKey
ALTER TABLE `Donantes` DROP FOREIGN KEY `Donantes_UserID_fkey`;

-- DropForeignKey
ALTER TABLE `Receptores` DROP FOREIGN KEY `Receptores_UserID_fkey`;

-- DropForeignKey
ALTER TABLE `Solicitudes` DROP FOREIGN KEY `Solicitudes_UserID_fkey`;

-- DropForeignKey
ALTER TABLE `Solicitudes` DROP FOREIGN KEY `Solicitudes_bloodDonorID_fkey`;

-- DropForeignKey
ALTER TABLE `Solicitudes` DROP FOREIGN KEY `Solicitudes_bloodReceiverID_fkey`;

-- DropIndex
DROP INDEX `nameRol_index` ON `Useres`;

-- AlterTable
ALTER TABLE `Donaciones` DROP COLUMN `bloodRequestID`,
    ADD COLUMN `DoctorID` VARCHAR(200) NULL,
    ADD COLUMN `bloodDonorId` VARCHAR(50) NULL,
    ADD COLUMN `fulfilled` ENUM('PROCESS', 'COMPLETED', 'PAUSED') NULL DEFAULT 'PROCESS';

-- AlterTable
ALTER TABLE `Donantes` DROP COLUMN `UserID`,
    ADD COLUMN `AuthorID` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `Historial_acciones` ADD COLUMN `personId` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `Personas` ADD COLUMN `username` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `Receptores` DROP COLUMN `UserID`,
    ADD COLUMN `AuthorID` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `Solicitudes` DROP COLUMN `UserID`,
    DROP COLUMN `bloodDonorID`,
    DROP COLUMN `bloodReceiverID`,
    ADD COLUMN `BloodReceiverID` VARCHAR(50) NULL,
    ADD COLUMN `bloodDonationId` VARCHAR(50) NULL,
    ADD COLUMN `supervisorID` VARCHAR(200) NULL,
    MODIFY `fulfilled` ENUM('PROCESS', 'COMPLETED', 'PAUSED') NULL DEFAULT 'PROCESS';

-- AlterTable
ALTER TABLE `Useres` DROP COLUMN `userRol`,
    DROP COLUMN `username`,
    ADD COLUMN `doctorRol` ENUM('DOCTOR_ADMIN', 'DOCTOR_MEMBER', 'ADMIN') NULL DEFAULT 'DOCTOR_MEMBER';

-- CreateIndex
CREATE UNIQUE INDEX `Donantes_AuthorID_key` ON `Donantes`(`AuthorID`);

-- CreateIndex
CREATE UNIQUE INDEX `Receptores_AuthorID_key` ON `Receptores`(`AuthorID`);

-- CreateIndex
CREATE INDEX `doctorRol_index` ON `Useres`(`doctorRol`);

-- AddForeignKey
ALTER TABLE `Historial_acciones` ADD CONSTRAINT `Historial_acciones_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Personas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donantes` ADD CONSTRAINT `Donantes_AuthorID_fkey` FOREIGN KEY (`AuthorID`) REFERENCES `Personas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receptores` ADD CONSTRAINT `Receptores_AuthorID_fkey` FOREIGN KEY (`AuthorID`) REFERENCES `Personas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_BloodReceiverID_fkey` FOREIGN KEY (`BloodReceiverID`) REFERENCES `Receptores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_supervisorID_fkey` FOREIGN KEY (`supervisorID`) REFERENCES `Useres`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_bloodDonationId_fkey` FOREIGN KEY (`bloodDonationId`) REFERENCES `Donaciones`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donaciones` ADD CONSTRAINT `Donaciones_bloodDonorId_fkey` FOREIGN KEY (`bloodDonorId`) REFERENCES `Donantes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donaciones` ADD CONSTRAINT `Donaciones_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Useres`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
