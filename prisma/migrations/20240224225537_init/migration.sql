/*
  Warnings:

  - You are about to drop the `userrole` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roleId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `userrole` DROP FOREIGN KEY `userRole_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `userrole` DROP FOREIGN KEY `userRole_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `roleId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `userrole`;

-- CreateIndex
CREATE UNIQUE INDEX `user_roleId_key` ON `user`(`roleId`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
