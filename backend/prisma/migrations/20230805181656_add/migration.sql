/*
  Warnings:

  - Added the required column `user2Icon` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Name` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "user2Icon" TEXT NOT NULL,
ADD COLUMN     "user2Name" TEXT NOT NULL;
