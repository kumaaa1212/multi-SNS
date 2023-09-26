import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

// labelを取得する
router.get("/album/labels", async (req, res) => {
  try {
    const albumLabels = await prisma.postLabel.findMany();
    res.json({ albumLabels });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

// albumを保存する
router.post("/keep-post/save", async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;

  try {
    const keepPost = await prisma.keepPost.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    return res.json({ keepPost });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

// albumを保存した内容を取得する
router.get("/keep-post/:authorId", async (req: Request, res: Response) => {
  const { authorId } = req.params;

  try {
    const keepPosts = await prisma.keepPost.findMany({
      where: {
        authorId: authorId,
      },
    });
    return res.json({ keepPosts });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

// albumを追加する
router.post("/tweet", async (req: Request, res: Response) => {
  const { content, authorId, authorName, authorAvatar, img, label } = req.body;

  try {
    const tweet = await prisma.tweet.create({
      data: {
        content,
        img,
        authorId,
        authorName,
        authorAvatar,
        label,
      },
    });
    return res.json({ tweet });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

// albumを追加する
router.post("/album", async (req: Request, res: Response) => {
  const {
    title,
    content,
    authorId,
    authorAvatar,
    labels,
    thumbnailText,
    thumbnailImg,
    authorName,
  } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        labels: {
          create: labels.map((label: any) => ({
            label: label.label,
            name: label.name,
            league: label.league,
            img: label.img,
          })),
        },
        thumbnailText,
        thumbnailImg,
        authorId,
        authorName,
        authorAvatar,
      },
    });
    return res.json({ post });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

// 削除して、albumの投稿順に返す
router.delete("/Newalbum/delete", async (req, res) => {
  const { postId } = req.query;

  try {
    // Delete post, likes, labels, and bookmarks related to the post
    await prisma.postLabel.deleteMany({
      where: {
        postId: Number(postId),
      },
    });

    await prisma.like.deleteMany({
      where: {
        postId: Number(postId),
      },
    });

    await prisma.bookmark.deleteMany({
      where: {
        postId: Number(postId),
      },
    });

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Fetch remaining posts in creation order
    const remainAlbums = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        likes: true,
        labels: true,
      },
    });

    return res.json({ remainAlbums });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the post." });
  }
});

// 削除して、albumのlikeの順に返す
router.delete("/Likealbum/delete", async (req, res) => {
  const { postId } = req.query;

  try {
    await prisma.postLabel.deleteMany({
      where: {
        postId: Number(postId),
      },
    });

    await prisma.like.deleteMany({
      where: {
        postId: Number(postId),
      },
    });

    await prisma.bookmark.deleteMany({
      where: {
        postId: Number(postId),
      },
    });

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Fetch remaining posts in creation order
    const postsWithLikes = await prisma.post.findMany({
      include: {
        labels: true,
        likes: true,
        bookmarks: true,
      },
    });
    const remainAlbums = postsWithLikes.sort(
      (a, b) => b.likes.length - a.likes.length
    );

    return res.json({ remainAlbums });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the post." });
  }
});

// albumMoreのアルバムを削除する
router.delete("/album/more/delete", async (req, res) => {
  const { postId } = req.query;

  try {
    await prisma.postLabel.deleteMany({
      where: {
        postId: Number(postId),
      },
    });

    await prisma.like.deleteMany({
      where: {
        postId: Number(postId),
      },
    });

    await prisma.bookmark.deleteMany({
      where: {
        postId: Number(postId),
      },
    });

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found." });
    }

    return res.json( 'success' );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the post." });
  }
});

// 全アルバムの取得(いいね順上位6個)
router.get("/all/album/top", async (req: Request, res: Response) => {
  try {
    const album = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        labels: true,
        likes: true,
        bookmarks: true,
      },
    });

    // likesの長さでソートして上位6つを選択
    const topAlbumLikedContent = album
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(0, 6);

    return res.json({ topAlbumLikedContent });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

// 全tweetの取得(いいね順上位6個)
router.get("/all/tweet/top", async (req: Request, res: Response) => {
  try {
    const tweets = await prisma.tweet.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        likes: true,
      },
    });

    // likesの長さでソートして上位6つを選択
    const topTweetLikedContent = tweets
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(0, 6);

    return res.json({ topTweetLikedContent });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

// 特定の投稿を取得する
router.get("/album/:postId", async (req: Request, res: Response) => {
  const { postId } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
      include: {
        labels: true,
        likes: true,
        bookmarks: true,
      },
    });

    if (post) {
      return res.json({ post });
    } else {
      return res.json({ message: "Post not found" });
    }
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

// 特定のユーザーの投稿を取得する
router.get("/album/myalbum/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        labels: true,
        likes: true,
        bookmarks: true,
      },
    });
    return res.json({ posts });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

// いいねを追加する
router.post("/album/like/add", async (req: Request, res: Response) => {
  const { postId, authorId } = req.body;

  try {
    const newLike = await prisma.like.create({
      data: {
        postId,
        authorId,
      },
    });

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          connect: {
            id: newLike.id,
          },
        },
      },
      include: {
        likes: true,
      },
    });
    return res.json({ updatedPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to add like." });
  }
});

// いいねを取り除く
router.post("/album/like/delete", async (req: Request, res: Response) => {
  const { postId, authorId } = req.body;

  try {
    // まずはいいねを削除
    await prisma.like.deleteMany({
      where: {
        postId,
        authorId,
      },
    });

    // 削除されたいいねに関連するPostを取得
    const relatedPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        likes: true,
      },
    });

    if (relatedPost) {
      const updatedLikes = relatedPost.likes.filter(
        (like) => like.authorId !== authorId
      );

      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            set: updatedLikes,
          },
        },
        include: {
          likes: true, // Include likes in the response
        },
      });

      return res.json({ updatedPost });
    }

    return res.status(404).json({ error: "Post not found." });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove like." });
  }
});

// いいねをしているかを確認する
router.get("/album/like/check", async (req: Request, res: Response) => {
  const { postId, authorId } = req.query;

  try {
    const like = await prisma.like.findFirst({
      where: {
        postId: Number(postId),
        authorId: authorId as string,
      },
    });

    const hasLiked = !!like;

    return res.json({ hasLiked });
  } catch (error) {
    res.status(500).json({ error: "Failed to check like status." });
  }
});

// 特定のlikeの配列を返す
router.get("/like/count", async (req, res) => {
  const { postId } = req.query;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      include: {
        likes: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const likeCount = post.likes.length;

    return res.json({ likeCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch like count." });
  }
});

// 自分のいいねの一覧を取得する
router.get("/album/likes/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const likes = await prisma.like.findMany({
      where: {
        authorId: String(userId),
      },
    });

    return res.json({ likes: likes || [] });
  } catch (error) {
    console.error("Failed to retrieve likes:", error);
    return res.status(500).json({ error: "Failed to retrieve likes." });
  }
});

// 自分が保存しているかを確認する
router.get("/album/like/:authorId", async (req: Request, res: Response) => {
  const { authorId } = req.params;

  try {
    const likedPosts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            authorId: authorId,
          },
        },
      },
      include: {
        labels: true,
        likes: true,
        bookmarks: true,
      },
    });

    return res.json({ likedPosts });
  } catch (error) {
    res.status(500).json({ error: "Failed to check like status." });
  }
});

// ブックマークを追加する
router.post("/album/bookmark/add", async (req, res) => {
  const { postId, authorId } = req.body;

  try {
    const newBookmark = await prisma.bookmark.create({
      data: {
        postId,
        authorId,
      },
    });

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      include: {
        bookmarks: true, // ブックマークの情報を含める
      },
      data: {
        bookmarks: {
          connect: {
            id: newBookmark.id,
          },
        },
      },
    });

    return res.json({ updatedPost });
  } catch (error) {
    console.error("Failed to add bookmark:", error);
    return res.status(500).json({ error: "Failed to add bookmark." });
  }
});

// bookmarkを削除する
router.delete("/album/bookmark/delete", async (req: Request, res: Response) => {
  const { postId, authorId } = req.body;

  try {
    // まずはブックマークを削除
    await prisma.bookmark.deleteMany({
      where: {
        postId,
        authorId,
      },
    });

    // 削除されたブックマークに関連するPostを取得
    const relatedPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        bookmarks: true,
      },
    });

    return res.json({ relatedPost });
  } catch (error) {
    console.error("Failed to remove bookmark:", error);
    return res.status(500).json({ error: "Failed to remove bookmark." });
  }
});

router.post("/album/like/check", async (req: Request, res: Response) => {
  const { postId, authorId } = req.body;

  try {
    const like = await prisma.like.findFirst({
      where: {
        postId,
        authorId,
      },
    });

    const hasLiked = !!like;

    return res.json({ hasLiked });
  } catch (error) {
    res.status(500).json({ error: "Failed to check like status." });
  }
});

// ブックマークの状態を確認する
router.get("/album/bookmark/check", async (req: Request, res: Response) => {
  const { postId, authorId } = req.query;

  try {
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        postId: Number(postId),
        authorId: String(authorId),
      },
    });

    const hasLiked = !!bookmark;

    return res.json({ hasLiked });
  } catch (error) {
    res.status(500).json({ error: "Failed to check bookmark status." });
  }
});

// 特定のbookmarkの配列を返す
router.get("/album/bookmark/get", async (req, res) => {
  const { postId, authorId } = req.query;

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        postId: Number(postId),
        authorId: String(authorId),
      },
    });

    const bookmarkCount = bookmarks.length;

    return res.json({ bookmarkCount });
  } catch (error) {
    console.error("Failed to fetch bookmarks:", error);
    return res.status(500).json({ error: "Failed to fetch bookmarks." });
  }
});

// 自分がbookmarkした投稿の取得
router.get(
  "/album/bookmarked/:authorId",
  async (req: Request, res: Response) => {
    const { authorId } = req.params;

    try {
      const bookmarkedPosts = await prisma.post.findMany({
        where: {
          bookmarks: {
            some: {
              authorId: authorId,
            },
          },
        },
        include: {
          labels: true,
          likes: true,
          bookmarks: true,
        },
      });

      return res.json({ bookmarkedPosts });
    } catch (error) {
      console.error("Failed to retrieve bookmarked posts:", error);
      return res
        .status(500)
        .json({ error: "Failed to retrieve bookmarked posts." });
    }
  }
);

// ラベルによるチーム別投稿の取得
router.get("/album/team/:label", async (req: Request, res: Response) => {
  const { label } = req.params;

  try {
    const postsWithLabel = await prisma.post.findMany({
      where: {
        labels: {
          some: {
            label: label,
          },
        },
      },
      include: {
        labels: true,
        likes: true,
      },
    });

    return res.json({ post: postsWithLabel }); // 配列で返す
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

// tweetのlikeを確認する
router.post("/tweet/like/check", async (req: Request, res: Response) => {
  const { tweetId, authorId } = req.body;

  try {
    const like = await prisma.tweetLike.findFirst({
      where: {
        tweetId,
        authorId,
      },
    });

    const hasLiked = !!like;

    return res.json({ hasLiked });
  } catch (error) {
    res.status(500).json({ error: "Failed to check like status." });
  }
});

// tweetのlikeを削除する
router.post("/tweet/like/delete", async (req: Request, res: Response) => {
  const { tweetId, authorId } = req.body;

  try {
    // まずはいいねを削除
    await prisma.tweetLike.deleteMany({
      where: {
        tweetId,
        authorId,
      },
    });

    // 削除されたいいねに関連するTweetを取得
    const relatedTweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
      include: {
        likes: true,
      },
    });

    if (relatedTweet) {
      const updatedLikes = relatedTweet.likes.filter(
        (like) => like.authorId !== authorId
      );

      const updatedTweet = await prisma.tweet.update({
        where: {
          id: tweetId,
        },
        data: {
          likes: {
            set: updatedLikes,
          },
        },
      });

      return res.json({ updatedTweet });
    }

    return res.status(404).json({ error: "Tweet not found." });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove like." });
  }
});

// tweetにlikeを追加する
router.post("/tweet/like/add", async (req: Request, res: Response) => {
  const { tweetId, authorId } = req.body;

  try {
    const newLike = await prisma.tweetLike.create({
      data: {
        tweetId,
        authorId,
      },
    });

    const updatedTweet = await prisma.tweet.update({
      where: {
        id: tweetId,
      },
      data: {
        likes: {
          connect: {
            id: newLike.id,
          },
        },
      },
      include: {
        likes: true,
      },
    });
    return res.json({ updatedTweet });
  } catch (error) {
    res.status(500).json({ error: "Failed to add like." });
  }
});

// 自分がlikeしたtweetの取得
router.get("/tweet/like/:authorId", async (req: Request, res: Response) => {
  const { authorId } = req.params;

  try {
    const likedTweets = await prisma.tweet.findMany({
      where: {
        likes: {
          some: {
            authorId: authorId,
          },
        },
      },
      include: {
        likes: true,
      },
    });

    return res.json({ likedTweets });
  } catch (error) {
    res.status(500).json({ error: "Failed to check like status." });
  }
});

// 削除して、albumの投稿順に返す
router.delete("/newTweet/delete", async (req, res) => {
  const { tweetId } = req.query;

  try {
    // Delete tweet likes
    await prisma.tweetLike.deleteMany({
      where: {
        tweetId: Number(tweetId),
      },
    });

    // Delete the tweet
    const deletedTweet = await prisma.tweet.delete({
      where: {
        id: Number(tweetId),
      },
    });

    if (!deletedTweet) {
      return res.status(404).json({ error: "Tweet not found." });
    }

    // Fetch remaining tweets in creation order
    const remainingTweets = await prisma.tweet.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        likes: true,
      },
    });

    return res.json({ remainingTweets });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the tweet." });
  }
});

// 削除して、albumのlikeの順に返す
router.delete("/likeTweet/delete", async (req, res) => {
  const { tweetId } = req.query;

  try {
    // Delete tweet labels
    await prisma.postLabel.deleteMany({
      where: {
        postId: Number(tweetId),
      },
    });

    // Delete tweet likes
    await prisma.tweetLike.deleteMany({
      where: {
        tweetId: Number(tweetId),
      },
    });

    // Delete the tweet
    const deletedTweet = await prisma.tweet.delete({
      where: {
        id: Number(tweetId),
      },
    });

    if (!deletedTweet) {
      return res.status(404).json({ error: "Tweet not found." });
    }

    // Fetch remaining tweets in order of likes count
    const remainingTweets = await prisma.tweet.findMany({
      include: {
        likes: true,
      },
    });

    // Sort the tweets by likes count in descending order
    const sortedTweets = remainingTweets.sort(
      (a, b) => b.likes.length - a.likes.length
    );

    return res.json({ sortedTweets });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the tweet." });
  }
});

export default router;
