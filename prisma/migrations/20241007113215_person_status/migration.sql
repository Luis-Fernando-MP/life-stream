/*
  Warnings:

  - You are about to drop the column `isActive` on the `Personas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Personas` DROP COLUMN `isActive`,
    ADD COLUMN `state` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED') NULL DEFAULT 'ACTIVE';
