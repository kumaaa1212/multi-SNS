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
    include: {
      followers: true,
      follows: true,
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
      include: {
        followers: true,
        follows: true,
      },
    });
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ユーザーの情報を更新
router.put("/update/:id", async (req, res) => {
  const { name, bio, icon, twitterURL, teamURL } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id), // 文字列から数値に変換
      },
      data: {
        name: name,
        bio: bio,
        icon: icon,
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
  const { authorId, userId, bio, name, icon, team, twitterURL, teamURL } =
    req.body;

  try {
    const authorUser = await prisma.user.findUnique({
      where: { id: Number(authorId) },
    });

    const followerUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!authorUser || !followerUser) {
      return res.status(404).json({ error: "User not found." });
    }

    await prisma.follow.create({
      data: {
        userId: Number(userId),
        frendId: Number(authorId),
        bio: authorUser.bio,
        name: authorUser.name,
        icon: authorUser.icon,
        team: authorUser.team,
        twitterURL: authorUser.twitterURL,
        teamURL: authorUser.teamURL,
      },
    });

    await prisma.follower.create({
      data: {
        userId: Number(authorId),
        frendId: Number(userId),
        bio,
        name,
        icon,
        team,
        twitterURL,
        teamURL,
      },
    });

    const updateUser = await prisma.user.findFirst({
      where: { id: Number(userId) },
      include: {
        follows: true,
        followers: true,
      },
    });

    res.status(200).json({ updateUser });
  } catch (error) {
    console.error("フォロー情報の保存中にエラーが発生しました:", error);
    res
      .status(500)
      .json({ error: "フォロー情報の保存中にエラーが発生しました。" });
  }
});

// unfollow
router.delete("/unfollow", async (req: Request, res: Response) => {
  const { authorId, userId } = req.query;

  try {
    const authorUser = await prisma.user.findUnique({
      where: { id: Number(authorId) },
    });

    const followerUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!authorUser || !followerUser) {
      return res.status(404).json({ error: "User not found." });
    }

    await prisma.follow.deleteMany({
      where: { userId: Number(userId) },
    });

    await prisma.follower.deleteMany({
      where: { userId: Number(authorId) },
    });

    const updateUser = await prisma.user.findFirst({
      where: { id: Number(userId) },
      include: {
        follows: true,
        followers: true,
      },
    });

    res.status(200).json({ updateUser });
  } catch (error) {
    console.error("フォローの削除中にエラーが発生しました:", error);
    res.status(500).json({ error: "フォローの削除中にエラーが発生しました。" });
  }
});

// followの状態を確認する
router.get("/follow/check", async (req: Request, res: Response) => {
  const { userId, authorId } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(authorId) },
      include: { followers: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isFollowing = user.followers.some(
      (follow) => follow.frendId === Number(userId)
    );

    return res.json({ isFollowing });
  } catch (error) {
    console.error("Error checking follow status:", error);
    return res.status(500).json({ error: "Failed to check follow status." });
  }
});

export default router;
