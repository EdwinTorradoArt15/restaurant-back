-- CreateTable
CREATE TABLE `logSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_sesion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `request` TEXT NOT NULL,
    `response` TEXT NOT NULL,
    `ip` VARCHAR(255) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `logSession` ADD CONSTRAINT `logSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
