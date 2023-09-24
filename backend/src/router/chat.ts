import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

// チャットルームを作成する
router.post("/newroom", async (req: Request, res: Response) => {
  const { user1Id, user1Name, user1Icon, user2Id, user2Name, user2Icon } =
    req.body;

  try {
    const room = await prisma.room.create({
      data: {
        user1Id,
        user1Name,
        user1Icon,
        user2Id: String(user2Id),
        user2Name,
        user2Icon,
      },
    });

    return res.json({ room });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create new room." });
  }
});

// チャットルームの一覧を取得する
router.get("/room/chat", async (req: Request, res: Response) => {
  const { userId } = req.body;
  const room = await prisma.room.findMany({
    where: {
      user1Id: userId,
    },
  });
  return res.json({ room });
});

// チャットルームを取得する
router.get("/allrooms/:authorId", async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;

    const rooms = await prisma.room.findMany({
      where: {
        OR: [
          {
            user1Id: authorId,
          },
          {
            user2Id: authorId,
          },
        ],
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return res.json({ rooms });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to fetch rooms and messages." });
  }
});

// チャット内容を取得する
router.get("/room/chat/:roomId", async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const messages = await prisma.message.findMany({
    where: {
      roomId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return res.json({ messages });
});

// チャット内容を作成する
router.post("/room/add/message", async (req: Request, res: Response) => {
  const { roomId, content, authorId, senderId } = req.body;

  try {
    const newMessage = await prisma.message.create({
      data: {
        content,
        authorId,
        senderId,
        roomId,
      },
    });

    const updatedRoom = await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
    });

    return res.json({ message: newMessage, room: updatedRoom });
  } catch (error) {
    res.status(500).json({ error: "Failed to add message to room." });
  }
});

// クリックしたchatroomを取得する
router.get("/rooms/:id/selected", async (req: Request, res: Response) => {
  const roomId = req.params.id;

  try {
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        messages: true,
      },
    });
    if (!room) {
      return res.status(404).json({ error: "Room not found." });
    }

    return res.json({ room });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch room and messages." });
  }
});

export default router;
