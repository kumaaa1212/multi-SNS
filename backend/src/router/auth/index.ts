import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { middleware } from "../../middleware";
import dotenv from "dotenv";

const router: Router = Router();
const prisma = new PrismaClient();
dotenv.config();

// ユーザー登録
router.post("/register", async (req: Request, res: Response) => {
  const { email, password, name, team, bio, icon } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        team,
        icon,
        bio,
        twitterURL: "",
        teamURL: "",
      },
    });
    res.json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "User creation failed" });
  }
});

// ログイン
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const passwordMatch = bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Password does not match" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  res.json({ token, user });
});

// ユーザー情報取得
router.get("/me", middleware, async (req: any, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.userId),
      },
    });
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  const { name, bio, iconPath, twitterURL, teamURL } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(id), // 文字列から数値に変換
      },
      data: {
        name: name,
        bio: bio,
        icon: iconPath,
        twitterURL: twitterURL,
        teamURL: teamURL,
      },
    });

    res.json({ user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// follow
router.post("/follow", async (req: Request, res: Response) => {
  const { authorId, userId, bio, name, iconpath, team, twitterURL, teamURL } =
    req.body;

  try {
    const newFollow = await prisma.follow.create({
      data: {
        userId: Number(authorId),
        bio,
        name,
        icon: iconpath,
        team,
        twitterURL,
        teamURL,
        frendId: Number(userId),
      },
    });

    // 更新前に関連するデータの存在を確認
    const existingAuthor = await prisma.user.findUnique({
      where: { id: Number(authorId) },
    });

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!existingAuthor || !existingUser) {
      return res.status(404).json({ error: "ユーザーが見つかりません" });
    }

    await prisma.user.update({
      where: { id: Number(authorId) },
      data: {
        follow: {
          connect: { id: newFollow.id },
        },
      },
    });

    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        follower: {
          connect: { id: newFollow.id },  // 更新対象を newFollow.id に変更
        },
      },
    });

    res.status(200).json({ message: "フォローが正常に作成されました。" });
  } catch (error) {
    console.error("フォロー情報の保存中にエラーが発生しました:", error);
    res
      .status(500)
      .json({ error: "フォロー情報の保存中にエラーが発生しました。" });
  }
});


router.delete("/unfollow", async (req: Request, res: Response) => {
  const { authorId, userId } = req.params;

  try {
    // フォローを削除
    await prisma.follow.deleteMany({
      where: {
        userId: Number(authorId),
        frendId: Number(userId),
      },
    });

    // フォローを削除したユーザーの follow 関連フィールドから削除
    await prisma.user.update({
      where: { id: Number(authorId) },
      data: {
        follow: {
          disconnect: { id: Number(userId) },
        },
      },
    });

    // フォローされたユーザーの follower 関連フィールドから削除
    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        follower: {
          disconnect: { id: Number(authorId) },
        },
      },
    });

    // 正常なレスポンスを返す
    res.status(200).json({ message: "フォローが正常に削除されました。" });
  } catch (error) {
    // エラーが発生した場合、エラーレスポンスを返す
    console.error("フォローの削除中にエラーが発生しました:", error);
    res.status(500).json({ error: "フォローの削除中にエラーが発生しました。" });
  }
});

export default router;
