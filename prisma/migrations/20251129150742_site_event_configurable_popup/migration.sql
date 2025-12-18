-- AlterTable
ALTER TABLE `siteevent` ADD COLUMN `maxShowsPerUser` INTEGER NULL,
    ADD COLUMN `showOnSlugs` VARCHAR(191) NULL,
    ADD COLUMN `triggerDelayMs` INTEGER NULL,
    ADD COLUMN `triggerScrollPercent` INTEGER NULL;
