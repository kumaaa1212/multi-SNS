const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// チャットルームを作成する
router.post("/newroom", async (req, res) => {
  const { user1Id, user2Id } = req.body;
  const room = await prisma.room.create({
    data: {
      user1Id,
      user2Id,
    },
  });
  console.log(room);
  return res.json({ room });

});

// チャットルームの一覧を取得する
router.get("/room/chat", async (req, res) => {
  const { userId } = req.body;
  const room = await prisma.room.findMany({
    where: {
      user1Id: userId,
    },
  });
  return res.json({ room });
});

// チャットルームを取得する
router.get("/room/allroom", async (req, res) => {
  const { partnerId } = req.body;
  const rooms = await prisma.room.findMany({
    where: {
      user2Id: partnerId,
    },
  });
  return res.json({ rooms });
});

// チャット内容を取得する
router.get("/room/chat", async (req, res) => {
  const { roomId } = req.body;
  const messages = await prisma.message.findMany({
    where: {
      roomId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return res.json({ messages });
})

// チャット内容を作成する
router.post("/room/chat", async (req, res) => {
  const { roomId, authorId, content } = req.body;
  const message = await prisma.message.create({
    data: {
      roomId,
      authorId,
      senderId,
      content,
    },
  });
  return res.json({ message });
})

module.exports = router;