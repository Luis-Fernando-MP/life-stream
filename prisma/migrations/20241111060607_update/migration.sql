-- CreateTable
CREATE TABLE `Personas` (
    `id` VARCHAR(50) NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `photo` VARCHAR(255) NULL,
    `email` VARCHAR(150) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `state` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED') NULL DEFAULT 'ACTIVE',
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,

    UNIQUE INDEX `Personas_email_key`(`email`),
    INDEX `name_index`(`firstName`, `lastName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historial_acciones` (
    `id` VARCHAR(50) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(400) NOT NULL,
    `queryType` ENUM('GRAPH', 'IMAGE', 'TEXT') NOT NULL DEFAULT 'TEXT',
    `speedA` DOUBLE NULL DEFAULT 0.0,
    `speedB` DOUBLE NULL DEFAULT 0.0,
    `imageUrl` VARCHAR(255) NULL,
    `phrase` TEXT NULL,
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `personId` VARCHAR(50) NULL,

    INDEX `queryType_index`(`queryType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctores` (
    `id` VARCHAR(200) NOT NULL,
    `personID` VARCHAR(50) NOT NULL,
    `doctorRol` ENUM('DOCTOR_ADMIN', 'DOCTOR_MEMBER', 'ADMIN') NULL DEFAULT 'DOCTOR_MEMBER',
    `DNI` VARCHAR(8) NOT NULL,

    UNIQUE INDEX `Doctores_personID_key`(`personID`),
    UNIQUE INDEX `Doctores_DNI_key`(`DNI`),
    INDEX `doctorRol_index`(`doctorRol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pacientes` (
    `id` VARCHAR(200) NOT NULL,
    `age` INTEGER NOT NULL,
    `weight` DOUBLE NOT NULL,
    `bloodType` ENUM('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE') NOT NULL,
    `DNI` VARCHAR(8) NOT NULL,
    `personID` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Pacientes_DNI_key`(`DNI`),
    UNIQUE INDEX `Pacientes_personID_key`(`personID`),
    INDEX `bloodType_index`(`bloodType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donantes` (
    `id` VARCHAR(50) NOT NULL,
    `lastDonation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientID` VARCHAR(200) NOT NULL,
    `AuthorID` VARCHAR(200) NOT NULL,
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,

    UNIQUE INDEX `Donantes_patientID_key`(`patientID`),
    INDEX `lastDonation_index`(`lastDonation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Receptores` (
    `id` VARCHAR(50) NOT NULL,
    `patientID` VARCHAR(200) NOT NULL,
    `AuthorID` VARCHAR(200) NOT NULL,
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,

    UNIQUE INDEX `Receptores_patientID_key`(`patientID`),
    INDEX `createdAt_receiver_index`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitudes` (
    `id` VARCHAR(50) NOT NULL,
    `requestDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fulfilled` ENUM('PROCESS', 'COMPLETED', 'PAUSED') NULL DEFAULT 'PROCESS',
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,
    `BloodReceiverID` VARCHAR(50) NULL,
    `supervisorID` VARCHAR(200) NULL,
    `bloodDonationId` VARCHAR(50) NULL,

    INDEX `request_status_index`(`requestDate`, `fulfilled`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donaciones` (
    `id` VARCHAR(50) NOT NULL,
    `fulfilled` ENUM('PROCESS', 'COMPLETED', 'PAUSED') NULL DEFAULT 'PROCESS',
    `donationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,
    `bloodDonorId` VARCHAR(50) NULL,
    `DoctorID` VARCHAR(200) NULL,

    INDEX `donationDate_index`(`donationDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Historial_acciones` ADD CONSTRAINT `Historial_acciones_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Personas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctores` ADD CONSTRAINT `Doctores_personID_fkey` FOREIGN KEY (`personID`) REFERENCES `Personas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pacientes` ADD CONSTRAINT `Pacientes_personID_fkey` FOREIGN KEY (`personID`) REFERENCES `Personas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donantes` ADD CONSTRAINT `Donantes_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Pacientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donantes` ADD CONSTRAINT `Donantes_AuthorID_fkey` FOREIGN KEY (`AuthorID`) REFERENCES `Personas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receptores` ADD CONSTRAINT `Receptores_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Pacientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receptores` ADD CONSTRAINT `Receptores_AuthorID_fkey` FOREIGN KEY (`AuthorID`) REFERENCES `Personas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_BloodReceiverID_fkey` FOREIGN KEY (`BloodReceiverID`) REFERENCES `Receptores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_supervisorID_fkey` FOREIGN KEY (`supervisorID`) REFERENCES `Doctores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_bloodDonationId_fkey` FOREIGN KEY (`bloodDonationId`) REFERENCES `Donaciones`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donaciones` ADD CONSTRAINT `Donaciones_bloodDonorId_fkey` FOREIGN KEY (`bloodDonorId`) REFERENCES `Donantes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donaciones` ADD CONSTRAINT `Donaciones_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Doctores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
