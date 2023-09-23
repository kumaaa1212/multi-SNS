/*
  Warnings:

  - Added the required column `frendId` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frendId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "frendId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Follower" ADD COLUMN     "frendId" INTEGER NOT NULL;
