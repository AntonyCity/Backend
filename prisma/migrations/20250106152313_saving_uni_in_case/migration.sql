/*
  Warnings:

  - A unique constraint covering the columns `[uniId]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniId` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidate` ADD COLUMN `uniId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Candidate_uniId_key` ON `Candidate`(`uniId`);
