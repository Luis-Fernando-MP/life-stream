-- CreateTable
CREATE TABLE `Personas` (
    `id` VARCHAR(50) NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `photo` VARCHAR(255) NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    INDEX `name_index`(`firstName`, `lastName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctores` (
    `id` VARCHAR(200) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `personID` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `doctores_email_key`(`email`),
    UNIQUE INDEX `doctores_personID_key`(`personID`),
    INDEX `username_index`(`username`),
    INDEX `email_index`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pacientes` (
    `id` VARCHAR(200) NOT NULL,
    `age` INTEGER NOT NULL,
    `weight` DOUBLE NOT NULL,
    `bloodType` ENUM('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE') NOT NULL,
    `personID` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Pacientes_personID_key`(`personID`),
    INDEX `bloodType_index`(`bloodType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donantes` (
    `id` VARCHAR(50) NOT NULL,
    `lastDonation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,
    `patientID` VARCHAR(200) NOT NULL,
    `doctorID` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `Donantes_patientID_key`(`patientID`),
    UNIQUE INDEX `Donantes_doctorID_key`(`doctorID`),
    INDEX `lastDonation_index`(`lastDonation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Receptores` (
    `id` VARCHAR(50) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,
    `patientID` VARCHAR(200) NOT NULL,
    `doctorID` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `Receptores_patientID_key`(`patientID`),
    UNIQUE INDEX `Receptores_doctorID_key`(`doctorID`),
    INDEX `createdAt_receiver_index`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitudes` (
    `id` VARCHAR(50) NOT NULL,
    `requestDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fulfilled` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,
    `bloodReceiverID` VARCHAR(50) NULL,
    `bloodDonorID` VARCHAR(50) NULL,
    `doctorID` VARCHAR(200) NULL,

    INDEX `request_status_index`(`requestDate`, `fulfilled`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donaciones` (
    `id` VARCHAR(50) NOT NULL,
    `donationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,
    `bloodRequestID` VARCHAR(50) NULL,

    UNIQUE INDEX `Donaciones_bloodRequestID_key`(`bloodRequestID`),
    INDEX `donationDate_index`(`donationDate`),
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
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `queryType_index`(`queryType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `doctores` ADD CONSTRAINT `doctores_personID_fkey` FOREIGN KEY (`personID`) REFERENCES `Personas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pacientes` ADD CONSTRAINT `Pacientes_personID_fkey` FOREIGN KEY (`personID`) REFERENCES `Personas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donantes` ADD CONSTRAINT `Donantes_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Pacientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donantes` ADD CONSTRAINT `Donantes_doctorID_fkey` FOREIGN KEY (`doctorID`) REFERENCES `doctores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receptores` ADD CONSTRAINT `Receptores_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Pacientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receptores` ADD CONSTRAINT `Receptores_doctorID_fkey` FOREIGN KEY (`doctorID`) REFERENCES `doctores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_bloodReceiverID_fkey` FOREIGN KEY (`bloodReceiverID`) REFERENCES `Receptores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_bloodDonorID_fkey` FOREIGN KEY (`bloodDonorID`) REFERENCES `Donantes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_doctorID_fkey` FOREIGN KEY (`doctorID`) REFERENCES `doctores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donaciones` ADD CONSTRAINT `Donaciones_bloodRequestID_fkey` FOREIGN KEY (`bloodRequestID`) REFERENCES `Solicitudes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
