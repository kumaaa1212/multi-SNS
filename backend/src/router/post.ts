import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

// albumを追加する
router.post("/album", async (req: Request, res: Response) => {
  console.log(req.body);
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

// 投稿全の取得
router.get("/all/album", async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        labels: true,
      },
    });
    return res.json({ posts });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

// 特定のユーザーの投稿を取得する
router.get("/all/album/:userId", async (req: Request, res: Response) => {
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
      // 関連するLikeを手動で削除
      const updatedLikes = relatedPost.likes.filter(
        (like) => like.authorId !== authorId
      );

      // Postを更新して、関連するLikeを削除
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
        authorId: userId,
      },
    });

    return res.json({ likes: likes || [] });
  } catch (error) {
    console.error("Failed to retrieve likes:", error);
    return res.status(500).json({ error: "Failed to retrieve likes." });
  }
});

// ブックマークを追加する
router.post("/album/bookmarks/add", async (req, res) => {
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

    return res.json({ bookmark: newBookmark });
  } catch (error) {
    console.error("Failed to add bookmark:", error);
    return res.status(500).json({ error: "Failed to add bookmark." });
  }
});

// 自分がbookmarkした投稿の取得
router.get("/album/posts/bookmarked/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const bookmarkedPosts = await prisma.post.findMany({
      where: {
        bookmarks: {
          some: {
            authorId: userId,
          },
        },
      },
      include: {
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
});

// ラベルによるチーム別投稿の取得
router.get("/album/:label", async (req: Request, res: Response) => {
  const { label } = req.params;

  try {
    const postLabel = await prisma.postLabel.findFirst({
      where: {
        label: label,
      },
      include: {
        post: {
          include: {
            labels: true,
            likes: true,
          },
        },
      },
    });

    if (postLabel) {
      return res.json({ post: postLabel.post });
    } else {
      return res.json({ message: "Post not found" });
    }
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

export default router;
