-- CreateTable
CREATE TABLE `lesson_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` BIGINT NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `lesson_id` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
