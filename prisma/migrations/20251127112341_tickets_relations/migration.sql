/*
  Warnings:

  - You are about to drop the column `assignedToId` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `ticket` table. All the data in the column will be lost.
  - Added the required column `title` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_assignedToId_fkey`;

-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `assignedToId`,
    DROP COLUMN `email`,
    DROP COLUMN `message`,
    DROP COLUMN `subject`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `dueDate` DATETIME(3) NULL,
    ADD COLUMN `leadId` INTEGER NULL,
    ADD COLUMN `ownerId` INTEGER NULL,
    ADD COLUMN `requesterId` INTEGER NULL,
    ADD COLUMN `resolvedAt` DATETIME(3) NULL,
    ADD COLUMN `tags` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `TicketComment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticketId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'note',
    `visibility` VARCHAR(191) NOT NULL DEFAULT 'internal',
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_requesterId_fkey` FOREIGN KEY (`requesterId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketComment` ADD CONSTRAINT `TicketComment_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketComment` ADD CONSTRAINT `TicketComment_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
