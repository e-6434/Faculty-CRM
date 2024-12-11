/*
  Warnings:

  - The primary key for the `lesson_group` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `lesson_group` DROP PRIMARY KEY,
    MODIFY `group_id` VARCHAR(20) NOT NULL,
    ADD PRIMARY KEY (`group_id`);
