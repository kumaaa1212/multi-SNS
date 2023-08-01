const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// チャットルームを作成する
router.post("/album", async (req, res) => {
  const { title, content, authorId, labels, thumbnailText } = req.body;
  console.log(labels);
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        labels: {
          create:labels
        },
        thumbnailText,
        authorId,
      },
    });
    return res.json({ post });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
