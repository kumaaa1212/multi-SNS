import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

// 掲示板のルームを作成する
router.get("/boardRooms/:team", async (req, res) => {
  const team = req.params.team;

  try {
    const boardRoom = await prisma.boardRoom.findFirst({
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
            createdAt: "desc",
          },
        },
      },
    });

    if (!boardRoom) {
      return res
        .status(404)
        .json({ error: "ボードルームが見つかりませんでした" });
    }

    return res.json({ boardRoom });
  } catch (error) {
    console.error("Failed to retrieve board room:", error);
    return res.status(500).json({ error: "ボードルームの取得に失敗しました" });
  }
});
// 掲示板を追加する
router.post("/boards/add", async (req, res) => {
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
        authorId: String(authorId),
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
            authorId: String(authorId),
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
    // メッセージを作成
    await prisma.boardMessage.create({
      data: {
        content,
        authorId: String(authorId),
        authorName,
        authorAvatar,
        board: {
          connect: {
            id: Number(boardId),
          },
        },
      },
    });

    // ボードを更新
    const updatedBoard = await prisma.board.findUnique({
      where: {
        id: parseInt(boardId),
      },
      include: {
        likes: true,
        messages: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // 更新されたボードをレスポンスとして返す
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
        boardId: Number(boardId),
        authorId: String(authorId),
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
router.get("/board/like/check", async (req: Request, res: Response) => {
  const { boardId, authorId } = req.query;

  try {
    const like = await prisma.boardLike.findFirst({
      where: {
        boardId: Number(boardId),
        authorId: String(authorId),
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
        boardId: Number(boardId),
        authorId: String(authorId),
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
// 掲示板の投稿を削除する
router.delete("/board/:boardId/delete", async (req, res) => {
  const { boardId } = req.params;
  const { team } = req.query;

  try {
    // Boardに関連するLikesを削除
    await prisma.boardLike.deleteMany({
      where: {
        boardId: Number(boardId),
      },
    });

    // Boardに関連するMessagesを削除
    await prisma.boardMessage.deleteMany({
      where: {
        boardId: Number(boardId),
      },
    });

    // ボードを削除
    await prisma.board.delete({
      where: {
        id: Number(boardId),
      },
    });

    // ボードが削除された後に新しいBoardRoomを取得
    const boardRoom = await prisma.boardRoom.findFirst({
      where: {
        team: String(team),
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
            createdAt: "desc",
          },
        },
      },
    });

    if (!boardRoom) {
      return res
        .status(404)
        .json({ error: "ボードルームが見つかりませんでした" });
    }

    return res.json({ boardRoom });
  } catch (error) {
    console.error("Failed to delete board and related data:", error);
    return res
      .status(500)
      .json({ error: "ボードの削除と新しいボードルームの取得に失敗しました" });
  }
});

export default router;
