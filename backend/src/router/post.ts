import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

// albumを追加する
router.post("/tweet", async (req: Request, res: Response) => {
  const { content, authorId, authorName, authorAvatar, img } = req.body;

  try {
    const tweet = await prisma.tweet.create({
      data: {
        content,
        img,
        authorId,
        authorName,
        authorAvatar,
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

// 投稿全の取得
router.get("/all/content", async (req: Request, res: Response) => {
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

    const tweets = await prisma.tweet.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        likes: true,
      },
    });

    // postsとtweetsを結合して1つの配列にする
    const allContent = [...posts, ...tweets];

    // likesの長さでソートして上位6つを選択
    const topLikedContent = allContent
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(0, 6);

    return res.json(topLikedContent);
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
        authorId: userId,
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

router.get("/boardRooms/:team", async (req, res) => {
  const team = req.params.team;

  try {
    const boardRooms = await prisma.boardRoom.findMany({
      where: {
        team: team,
      },
      include: {
        board: {
          include: {
            messages: {
              orderBy: {
                createdAt: "desc",
              },
            },
            likes: true,
          },
          orderBy: {
            createdAt: "desc", // 新しい順に並べ替える
          },
        },
      },
    });

    return res.json({ boardRooms });
  } catch (error) {
    console.error("Failed to retrieve board rooms:", error);
    return res.status(500).json({ error: "Failed to retrieve board rooms." });
  }
});

// 掲示板を追加する

router.post("/boards", async (req, res) => {
  const { content, authorId, authorName, authorAvatar, team } = req.body;

  try {
    const room = await prisma.boardRoom.findFirst({
      where: {
        team: team,
      },
    });

    if (!room) {
      return res
        .status(404)
        .json({ error: "Room not found for the specified team." });
    }

    await prisma.board.create({
      data: {
        content,
        authorId,
        authorName,
        authorAvatar,
        roomId: room.roomId,
      },
      include: {
        likes: true,
        messages: {
          orderBy: {
            createdAt: "asc", // 古い順に並べ替える
          },
        },
      },
    });

    const updatedRoom = await prisma.boardRoom.findUnique({
      where: {
        roomId: room.roomId,
      },
      include: {
        board: {
          include: {
            likes: true,
            messages: {
              orderBy: {
                createdAt: "asc", // 古い順に並べ替える
              },
            },
          },
          orderBy: {
            createdAt: "desc", // 新しい順に並べ替える
          },
        },
      },
    });

    return res.json({ updatedRoom });
  } catch (error) {
    console.error("Failed to create board:", error);
    return res.status(500).json({ error: "Failed to create board." });
  }
});

// 特定の掲示板を取得する
router.get("/boards/:id", async (req, res) => {
  const boardId = parseInt(req.params.id);

  try {
    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
      include: {
        room: true,
        likes: true,
        messages: true,
      },
    });

    if (!board) {
      return res.status(404).json({ error: "Board not found." });
    }

    return res.json({ board });
  } catch (error) {
    console.error("Failed to retrieve board:", error);
    return res.status(500).json({ error: "Failed to retrieve board." });
  }
});

// 掲示板一覧にいいねを追加する
router.post("/boards/:boardId/likes", async (req, res) => {
  const { boardId } = req.params;
  const { authorId } = req.body;

  try {
    const updatedBoard = await prisma.board.update({
      where: {
        id: parseInt(boardId),
      },
      data: {
        likes: {
          create: {
            authorId: authorId,
          },
        },
      },
    });

    return res.json({ board: updatedBoard });
  } catch (error) {
    console.error("Failed to add like to board:", error);
    return res.status(500).json({ error: "Failed to add like to board." });
  }
});

// 掲示板にメッセージを追加する
router.post("/boards/:boardId/messages", async (req, res) => {
  const { boardId } = req.params;
  const { content, authorId, authorName, authorAvatar } = req.body;

  try {
    await prisma.boardMessage.create({
      data: {
        content,
        authorId,
        authorName,
        authorAvatar,
        board: {
          connect: {
            id: parseInt(boardId),
          },
        },
      },
    });

    // 更新された board を取得
    const updatedBoard = await prisma.board.findUnique({
      where: {
        id: parseInt(boardId),
      },
      include: {
        likes: true,
        messages: {
          orderBy: {
            createdAt: "asc", // 古い順に並べ替える
          },
        },
      },
    });

    return res.json({ board: updatedBoard });
  } catch (error) {
    console.error("Failed to add message to board:", error);
    return res.status(500).json({ error: "Failed to add message to board." });
  }
});
// 掲示板にlikeを追加する
router.post("/board/like/add", async (req: Request, res: Response) => {
  const { boardId, authorId } = req.body;

  try {
    const newLike = await prisma.boardLike.create({
      data: {
        boardId,
        authorId,
      },
    });

    // 既存のボードを取得
    const existingBoard = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });

    // 既存のボードに新しい「いいね」を追加
    if (existingBoard) {
      const updatedBoard = await prisma.board.update({
        where: {
          id: boardId,
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

      return res.json({ updatedBoard });
    } else {
      return res.status(404).json({ error: "Board not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add like." });
  }
});
// 掲示板にlikeがあるかを確認する
router.post("/board/like/check", async (req: Request, res: Response) => {
  const { boardId, authorId } = req.body;

  try {
    const like = await prisma.boardLike.findFirst({
      where: {
        boardId,
        authorId,
      },
    });

    const hasLiked = !!like;

    return res.json({ hasLiked });
  } catch (error) {
    res.status(500).json({ error: "Failed to check like status." });
  }
});
// 掲示板のlikeを削除する
router.post("/board/like/delete", async (req: Request, res: Response) => {
  const { boardId, authorId } = req.body;

  try {
    // まずはいいねを削除
    await prisma.boardLike.deleteMany({
      where: {
        boardId,
        authorId,
      },
    });

    // 削除されたいいねに関連するBoardを取得
    const relatedBoard = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
      include: {
        likes: true,
        messages: true,
      },
    });

    if (relatedBoard) {
      const updatedLikes = relatedBoard.likes.filter(
        (like) => like.authorId !== authorId
      );

      const updatedBoard = await prisma.board.update({
        where: {
          id: boardId,
        },
        data: {
          likes: {
            set: updatedLikes,
          },
        },
        include: {
          likes: true,
          messages: true,
        },
      });

      return res.json({ updatedBoard });
    }

    return res.status(404).json({ error: "Board not found." });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove like." });
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

