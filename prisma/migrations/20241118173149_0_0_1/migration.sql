-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `number_of_book` INTEGER NOT NULL,
    `pdf` LONGBLOB NULL,
    `writer` TEXT NOT NULL,
    `nashername` VARCHAR(150) NOT NULL,
    `chap` VARCHAR(150) NOT NULL,
    `many` INTEGER NOT NULL,
    `shabk` VARCHAR(20) NOT NULL,
    `subject` VARCHAR(500) NOT NULL,

    UNIQUE INDEX `Post_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lesson` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `value` VARCHAR(1) NOT NULL DEFAULT '0',
    `about` VARCHAR(500) NOT NULL DEFAULT 'توضیح خاصی ندارد.',
    `book` VARCHAR(50) NULL,
    `pishniaz_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN', 'TEACHER') NOT NULL DEFAULT 'USER',
    `email` VARCHAR(191) NOT NULL,
    `hashedPassword` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `family` VARCHAR(191) NOT NULL,
    `education` VARCHAR(25) NOT NULL DEFAULT 'دیپلم',
    `expertise` VARCHAR(100) NOT NULL,
    `phon` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `image` LONGBLOB NULL,

    UNIQUE INDEX `User_image_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
