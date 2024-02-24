-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `telefono` VARCHAR(255) NOT NULL,
    `primer_nombre` VARCHAR(255) NOT NULL,
    `segundo_nombre` VARCHAR(255) NOT NULL,
    `primer_apellido` VARCHAR(255) NOT NULL,
    `segundo_apellido` VARCHAR(255) NOT NULL,
    `foto` VARCHAR(255) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `userData_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userData` ADD CONSTRAINT `userData_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
