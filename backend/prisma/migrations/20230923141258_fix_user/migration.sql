/*
  Warnings:

  - You are about to drop the column `frendId` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `frendId` on the `Follower` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_frendId_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_frendId_fkey";

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "frendId";

-- AlterTable
ALTER TABLE "Follower" DROP COLUMN "frendId";

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
