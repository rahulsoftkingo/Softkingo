-- DropIndex
DROP INDEX `Page_key_key` ON `page`;

-- AlterTable
ALTER TABLE `page` MODIFY `excerpt` LONGTEXT NULL,
    MODIFY `contentJson` LONGTEXT NULL,
    MODIFY `seoDescription` LONGTEXT NULL;

-- CreateIndex
CREATE INDEX `Page_type_status_idx` ON `Page`(`type`, `status`);

-- CreateIndex
CREATE INDEX `Page_slug_idx` ON `Page`(`slug`);
