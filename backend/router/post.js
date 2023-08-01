const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/album", async (req, res) => {
  const { title, content, authorId, labels, thumbnailText,thumbnailImg } = req.body;
  console.log(labels);
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        labels: {
          create: labels,
        },
        thumbnailText,
        thumbnailImg,
        authorId,
      },
    });
    return res.json({ post });
  } catch (err) {
    res.json({ error: err.message });
  }
});


// 投稿の取得
router.get("/all/album", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      }
    })
    return res.json({ posts })
}
  catch (err) {
    res.json({ error: err.message });
  }
})
// ラベルの取得
router.get("/match/label/:id", async (req, res) => {
  const { id } = req.params; 
  try {
    const postLabels = await prisma.postLabel.findMany({
      where: {
        postId:parseInt(id, 10),
      },
    });
    res.json(postLabels);
  } catch (error) {
    console.error('エラー:', error);
    res.status(500).json({ error: 'PostLabelの取得に失敗しました' });
  }
})

// いいね機能
router.post("/album/like", async (req, res) => {
  const { postId, userId } = req.body;
  // ここでユーザーIDなどの認証情報を取得するなどの処理を行うことが一般的です

  try {
    // いいねが既に存在するかチェック
    const existingLike = await prisma.like.findUnique({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      // 既にいいねが存在する場合、いいねを削除
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      // 更新されたPostのデータを取得
      const updatedPost = await prisma.post.findUnique({
        where: { id: postId },
        include: { likes: true }, // like[]を含むように指定
      });
      res.json(updatedPost);
    } else {
      // いいねが存在しない場合、新たにいいねを追加
      await prisma.like.create({
        data: {
          postId,
          userId: "ユーザーID", // ユーザーIDを適切な値に置き換える
        },
      });
      // 更新されたPostのデータを取得
      const updatedPost = await prisma.post.findUnique({
        where: { id: postId },
        include: { likes: true }, // like[]を含むように指定
      });

      res.json(updatedPost);
    }
  } catch (error) {
    console.error("エラー:", error);
    res.status(500).json({ error: "いいねの処理に失敗しました" });
  }
});

router.get("/album/:label", async (req, res) => {
  const { label } = req.params;
  try {
    // Post データを取得
    const post = await prisma.post.findMany({
      where: {
        labels: {
          some: {
            label: label, // Post の labels フィールドの中に name が一致するものがあるかチェック
          },
        },
      },
      include: {
        labels: true,
        likes: true,
      },
    });

    // Post データが見つかった場合の処理
    if (post) {
      return res.json({ post });
    } else {
      // 該当の Post データが見つからなかった場合の処理
      return res.json({ message: "Post not found" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});


module.exports = router;