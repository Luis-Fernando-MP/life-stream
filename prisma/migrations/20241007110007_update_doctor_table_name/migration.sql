/*
  Warnings:

  - You are about to drop the `Useres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Donaciones` DROP FOREIGN KEY `Donaciones_DoctorID_fkey`;

-- DropForeignKey
ALTER TABLE `Solicitudes` DROP FOREIGN KEY `Solicitudes_supervisorID_fkey`;

-- DropForeignKey
ALTER TABLE `Useres` DROP FOREIGN KEY `Useres_personID_fkey`;

-- DropTable
DROP TABLE `Useres`;

-- CreateTable
CREATE TABLE `Doctores` (
    `id` VARCHAR(200) NOT NULL,
    `personID` VARCHAR(50) NOT NULL,
    `doctorRol` ENUM('DOCTOR_ADMIN', 'DOCTOR_MEMBER', 'ADMIN') NULL DEFAULT 'DOCTOR_MEMBER',

    UNIQUE INDEX `Doctores_personID_key`(`personID`),
    INDEX `doctorRol_index`(`doctorRol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Doctores` ADD CONSTRAINT `Doctores_personID_fkey` FOREIGN KEY (`personID`) REFERENCES `Personas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_supervisorID_fkey` FOREIGN KEY (`supervisorID`) REFERENCES `Doctores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donaciones` ADD CONSTRAINT `Donaciones_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Doctores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
