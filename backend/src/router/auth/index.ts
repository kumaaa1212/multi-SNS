import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { middleware } from "../../middleware";
import dotenv from "dotenv";

const router: Router = Router();
const prisma = new PrismaClient();
dotenv.config()

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
      email,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Password does not match" });
  }
  const token = jwt.sign({ id: user.id },  process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  res.json({ token });
});

// ユーザー情報取得
router.get("/me", middleware, async (req: any, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
  });
  res.json({ user });
});

router.put("/update/:id", async (req, res) => {
  const { name, bio, icon, twitterURL, teamURL } = req.body;
  const { id } = req.params;
  
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(id), // 文字列から数値に変換
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


export default router;
