const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// albumを追加する
router.post("/album", async (req, res) => {
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
          create: labels,
        },
        thumbnailText,
        thumbnailImg,
        authorId,
        authorName,
        authorAvatar,
      },
    });
    return res.json({ post });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// 投稿全の取得
router.get("/all/album", async (req, res) => {
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
  } catch (err) {
    res.json({ error: err.message });
  }
});

// 投稿の取得
// router.get("/album/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = await prisma.post.findUnique({
//       where: {
//         id: parseInt(id, 10),
//       },
//       include: {
//         labels: true,
//         likes: true,
//       },
//     });
//     return res.json({ post });
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

router.post("/album/like/add", async (req, res) => {
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
router.post("/album/like/delete", async (req, res) => {
  const { postId, authorId } = req.body;

  try {
    await prisma.like.deleteMany({
      where: {
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
          disconnect: {
            id: postId,
          },
        },
      },
      include: {
        likes: true,
      },
    });

    return res.json({ updatedPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove like." });
  }
});

// いいねをしているかを確認する
router.post("/album/like/check", async (req, res) => {
  const { postId, authorId } = req.body;

  try {
    // Likeテーブルから該当するデータを検索
    const like = await prisma.like.findFirst({
      where: {
        postId,
        authorId,
      },
    });

    const hasLiked = like !== null; // もしlikeが見つかれば、いいねしていると判断

    return res.json({ hasLiked });
  } catch (error) {
    res.status(500).json({ error: "Failed to check like status." });
  }
});


// ラベルによるチーム別投稿の取得
router.get("/album/:label", async (req, res) => {
  const { label } = req.params;
  try {
    // PostLabel データを取得
    const postLabel = await prisma.postLabel.findFirst({
      where: {
        label: parseInt(label),
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
  } catch (err) {
    res.json({ error: err.message });
  }
});


module.exports = router;

