-- CreateTable
CREATE TABLE "TweetLike" (
    "id" SERIAL NOT NULL,
    "tweetId" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "TweetLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TweetLike_tweetId_authorId_key" ON "TweetLike"("tweetId", "authorId");

-- AddForeignKey
ALTER TABLE "TweetLike" ADD CONSTRAINT "TweetLike_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
