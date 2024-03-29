import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

// 掲示板のルームを作成する
router.get("/boardRooms/:team", async (req: Request, res: Response) => {
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
        .json({ error: "対象の掲示板が見つかりませんでした" });
    }

    return res.json({ boardRoom });
  } catch (error) {
    return res.status(500).json({ error: "対象の掲示板の取得に失敗しました" });
  }
});
// 掲示板に投稿する
router.post("/boards/add", async (req : Request, res : Response) => {
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
            createdAt: "asc",
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
                createdAt: "asc", 
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return res.json({ updatedRoom });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create board." });
  }
});
// 特定の掲示板を取得する
router.get("/boards/:id", async (req : Request, res : Response) => {
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
      return res.status(404).json({ error: "掲示板の取得に失敗しました" });
    }

    return res.json({ board });
  } catch (error) {
    return res.status(500).json({ error: "掲示板の取得に失敗しました" });
  }
});
// 掲示板一覧にいいねを追加する
router.post("/boards/:boardId/likes", async (req : Request, res : Response) => {
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
    return res.status(500).json({ error: "いいねの追加に失敗しました" });
  }
});
// 掲示板にメッセージを追加する
router.post("/boards/:boardId/messages", async (req : Request, res : Response) => {
  const { boardId } = req.params;
  const { content, authorId, authorName, authorAvatar } = req.body;

  try {
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

    return res.json({ board: updatedBoard });
  } catch (error) {
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

    const existingBoard = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });

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
    await prisma.boardLike.deleteMany({
      where: {
        boardId: Number(boardId),
        authorId: String(authorId),
      },
    });

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
    res.status(500).json({ error: "いいねの削除に失敗しました" });
  }
});
// 掲示板の投稿を削除する
router.delete("/board/:boardId/delete", async (req, res) => {
  const { boardId } = req.params;
  const { team } = req.query;

  try {
    await prisma.boardLike.deleteMany({
      where: {
        boardId: Number(boardId),
      },
    });

    await prisma.boardMessage.deleteMany({
      where: {
        boardId: Number(boardId),
      },
    });

    await prisma.board.delete({
      where: {
        id: Number(boardId),
      },
    });

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
    return res
      .status(500)
      .json({ error: "ボードの削除と新しいボードルームの取得に失敗しました" });
  }
});

export default router;
