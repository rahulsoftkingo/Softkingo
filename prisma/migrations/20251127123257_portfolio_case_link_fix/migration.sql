-- AlterTable
ALTER TABLE `portfolioproject` ADD COLUMN `caseStudyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `PortfolioProject` ADD CONSTRAINT `PortfolioProject_caseStudyId_fkey` FOREIGN KEY (`caseStudyId`) REFERENCES `CaseStudy`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
