-- CreateTable
CREATE TABLE "PostLabel" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "league" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostLabel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostLabel" ADD CONSTRAINT "PostLabel_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
