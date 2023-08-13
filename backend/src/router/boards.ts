import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();


// 掲示板を追加する
router.post("/boards", async (req, res) => {
  const { content, authorId, authorName, authorAvatar } = req.body;

  try {
    const newBoard = await prisma.board.create({
      data: {
        content,
        authorId,
        authorName,
        authorAvatar,
      },
    });
    return res.json({ board: newBoard });
  } catch (error) {
    console.error("Failed to create board:", error);
    return res.status(500).json({ error: "Failed to create board." });
  }
});

// 特定の掲示板を取得する
router.get('/boards/:boardId', async (req, res) => {
  const { boardId } = req.params;

  try {
    const board = await prisma.board.findUnique({
      where: {
        id: parseInt(boardId),
      },
      include: {
        likes: true,
        messages: true,
      },
    });

    if (!board) {
      return res.status(404).json({ error: 'Board not found.' });
    }

    return res.json({ board });
  } catch (error) {
    console.error('Failed to retrieve board:', error);
    return res.status(500).json({ error: 'Failed to retrieve board.' });
  }
});

// 掲示板一覧にいいねを追加する
router.post('/boards/:boardId/likes', async (req, res) => {
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
    console.error('Failed to add like to board:', error);
    return res.status(500).json({ error: 'Failed to add like to board.' });
  }
});

// 掲示板にメッセージを追加する
router.post('/boards/:boardId/messages', async (req, res) => {
  const { boardId } = req.params;
  const { content, authorId, authorName, authorAvatar } = req.body;

  try {
    const newMessage = await prisma.boardMessage.create({
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

    return res.json({ message: newMessage });
  } catch (error) {
    console.error('Failed to add message to board:', error);
    return res.status(500).json({ error: 'Failed to add message to board.' });
  }
});

export default router;
