/*
  Warnings:

  - Added the required column `thumbnailText` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "thumbnailText" TEXT NOT NULL;
