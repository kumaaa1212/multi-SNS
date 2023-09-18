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

// アルバムを削除し、削除後のアルバム一覧を返す
router.delete("/album/delete/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found." });
    }
    await Promise.all([
      prisma.postLabel.deleteMany({
        where: {
          postId: parseInt(postId),
        },
      }),
      prisma.like.deleteMany({
        where: {
          postId: parseInt(postId),
        },
      }),
      prisma.post.delete({
        where: {
          id: parseInt(postId),
        },
      }),
    ]);

    const remainingPosts = await prisma.post.findMany();

    const remainingPostsWithRelations = await Promise.all(
      remainingPosts.map(async (post) => {
        const likes = await prisma.like.findMany({
          where: {
            postId: post.id,
          },
        });

        const postLabels = await prisma.postLabel.findMany({
          where: {
            postId: post.id,
          },
        });

        return {
          ...post,
          likes,
          postLabels,
        };
      })
    );

    return res.json({
      remainingPosts: remainingPostsWithRelations,
    });
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
// 投稿全の取得(いいね順)
router.get("/all/content/order/like", async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        labels: true,
        likes: true,
        bookmarks: true,
      },
    });

    const topLikedContent = posts.sort(
      (a, b) => b.likes.length - a.likes.length
    );

    return res.json({ topLikedContent });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});
// 投稿全の取得(投稿順)
router.get("/all/content/order/new", async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
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
      });

      return res.json({ updatedPost });
    }

    return res.status(404).json({ error: "Post not found." });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove like." });
  }
});

// いいねをしているかを確認する
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

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        bookmarks: {
          connect: {
            id: newBookmark.id,
          },
        },
      },
    });

    return res.json({ newBookmark });
  } catch (error) {
    console.error("Failed to add bookmark:", error);
    return res.status(500).json({ error: "Failed to add bookmark." });
  }
});

// bookmarkを削除する
router.post("/album/bookmark/delete", async (req: Request, res: Response) => {
  const { postId, authorId } = req.body;
  try {
    // まずはいいねを削除
    await prisma.bookmark.deleteMany({
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
        bookmarks: true,
      },
    });

    if (relatedPost) {
      const updatedBookmarks = relatedPost.bookmarks.filter(
        (bookmark) => bookmark.authorId !== authorId
      );

      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          bookmarks: {
            set: updatedBookmarks,
          },
        },
      });

      return res.json({ updatedPost });
    }

    return res.status(404).json({ error: "Post not found." });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove like." });
  }
});
// 配列としてfindUniqueして、その値をsetする。からの配列をsetしている

// いいねをしているかを確認する
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
router.post("/album/bookmark/check", async (req: Request, res: Response) => {
  const { postId, authorId } = req.body;

  try {
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        postId,
        authorId,
      },
    });

    const hasLiked = !!bookmark;

    return res.json({ hasLiked });
  } catch (error) {
    res.status(500).json({ error: "Failed to check like status." });
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

export default router;
