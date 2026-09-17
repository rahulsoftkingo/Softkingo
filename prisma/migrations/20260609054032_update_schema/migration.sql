/*
  Warnings:

  - You are about to drop the `eguide` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ticketcomment` DROP FOREIGN KEY `TicketComment_ticketId_fkey`;

-- AlterTable
ALTER TABLE `blogcategory` ADD COLUMN `seoDescription` VARCHAR(191) NULL,
    ADD COLUMN `seoImage` VARCHAR(191) NULL,
    ADD COLUMN `seoTitle` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `blogpost` ADD COLUMN `faqs` LONGTEXT NULL,
    ADD COLUMN `placements` TEXT NULL,
    ADD COLUMN `summaryPoints` LONGTEXT NULL,
    ADD COLUMN `thumbnailType` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `blogtag` ADD COLUMN `seoDescription` VARCHAR(191) NULL,
    ADD COLUMN `seoImage` VARCHAR(191) NULL,
    ADD COLUMN `seoTitle` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `casestudy` ADD COLUMN `seoImage` VARCHAR(191) NULL,
    MODIFY `heroMockups` TEXT NULL,
    MODIFY `brandingJson` TEXT NULL,
    MODIFY `teamJson` TEXT NULL,
    MODIFY `clientJson` TEXT NULL,
    MODIFY `technologiesJson` TEXT NULL,
    MODIFY `overviewJson` TEXT NULL,
    MODIFY `requirementsJson` TEXT NULL,
    MODIFY `goalsJson` TEXT NULL,
    MODIFY `challengesJson` TEXT NULL,
    MODIFY `resultsJson` TEXT NULL,
    MODIFY `findYourAppJson` TEXT NULL;

-- AlterTable
ALTER TABLE `lead` ADD COLUMN `nextFollowUp` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `page` ADD COLUMN `heroImage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `teammember` ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `seoDescription` VARCHAR(191) NULL,
    ADD COLUMN `seoImage` VARCHAR(191) NULL,
    ADD COLUMN `seoTitle` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `lastClockIn` DATETIME(3) NULL,
    ADD COLUMN `lastClockOut` DATETIME(3) NULL,
    ADD COLUMN `profileImageType` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `eguide`;

-- CreateTable
CREATE TABLE `ebook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `authorName` VARCHAR(191) NULL,
    `authorRole` VARCHAR(191) NULL,
    `coverImage` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `readTimeText` VARCHAR(191) NULL,
    `summary` VARCHAR(191) NULL,
    `sectionsJson` LONGTEXT NULL,
    `pdfUrl` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `publishedAt` DATETIME(3) NULL,
    `seoTitle` VARCHAR(191) NULL,
    `seoDescription` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `downloadCount` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Ebook_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `worklog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `ticketId` INTEGER NULL,
    `description` TEXT NOT NULL,
    `startTime` VARCHAR(191) NULL,
    `endTime` VARCHAR(191) NULL,
    `duration` INTEGER NOT NULL DEFAULT 0,
    `date` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `worklog_userId_idx`(`userId`),
    INDEX `worklog_ticketId_idx`(`ticketId`),
    INDEX `worklog_date_idx`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `clockIn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `clockOut` DATETIME(3) NULL,
    `duration` INTEGER NULL,
    `location` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `attendance_userId_idx`(`userId`),
    INDEX `attendance_clockIn_idx`(`clockIn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance_break` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attendanceId` INTEGER NOT NULL,
    `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endTime` DATETIME(3) NULL,
    `duration` INTEGER NULL,
    `notes` VARCHAR(191) NULL,

    INDEX `attendance_break_attendanceId_idx`(`attendanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leave_request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `duration` DOUBLE NOT NULL,
    `reason` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `approvedBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `leave_request_userId_idx`(`userId`),
    INDEX `leave_request_status_idx`(`status`),
    INDEX `leave_request_approvedBy_fkey`(`approvedBy`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_salary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `baseSalary` DOUBLE NOT NULL,
    `hra` DOUBLE NULL,
    `allowance` DOUBLE NULL,
    `deductions` DOUBLE NULL,
    `tax` DOUBLE NULL,
    `netSalary` DOUBLE NOT NULL,
    `payPeriod` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'paid',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employee_salary_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payslip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeSalaryId` INTEGER NOT NULL,
    `period` VARCHAR(191) NOT NULL,
    `basicPay` DOUBLE NOT NULL,
    `hra` DOUBLE NOT NULL,
    `allowances` DOUBLE NOT NULL,
    `deductions` DOUBLE NOT NULL,
    `tax` DOUBLE NOT NULL,
    `netPay` DOUBLE NOT NULL,
    `workedDays` INTEGER NOT NULL,
    `paidLeaveDays` INTEGER NOT NULL,
    `unpaidLeaveDays` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payslip_employeeSalaryId_period_key`(`employeeSalaryId`, `period`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobopening` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'Full Time',
    `salary` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `requirements` TEXT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `botpolicy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` LONGTEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `worklog` ADD CONSTRAINT `worklog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `worklog` ADD CONSTRAINT `worklog_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `ticket`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticketcomment` ADD CONSTRAINT `TicketComment_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `ticket`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_break` ADD CONSTRAINT `attendance_break_attendanceId_fkey` FOREIGN KEY (`attendanceId`) REFERENCES `attendance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leave_request` ADD CONSTRAINT `leave_request_approvedBy_fkey` FOREIGN KEY (`approvedBy`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leave_request` ADD CONSTRAINT `leave_request_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_salary` ADD CONSTRAINT `employee_salary_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payslip` ADD CONSTRAINT `payslip_employeeSalaryId_fkey` FOREIGN KEY (`employeeSalaryId`) REFERENCES `employee_salary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
