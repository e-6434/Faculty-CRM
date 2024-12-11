/*
  Warnings:

  - Added the required column `number_group` to the `lesson_group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lesson_group` ADD COLUMN `number_group` VARCHAR(15) NOT NULL;
