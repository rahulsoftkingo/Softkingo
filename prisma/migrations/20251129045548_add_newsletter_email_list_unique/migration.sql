/*
  Warnings:

  - A unique constraint covering the columns `[email,listId]` on the table `NewsletterSubscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `NewsletterSubscription_email_listId_key` ON `NewsletterSubscription`(`email`, `listId`);
