import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

router.get("/all/content/order/like", async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        labels: true,
        likes: true,
        bookmarks: true,
      },
    });

    const articleTopLike = posts.sort(
      (a, b) => b.likes.length - a.likes.length
    );

    return res.json({ articleTopLike });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});
// 投稿全の取得(投稿順)
router.get("/all/content/order/new", async (req: Request, res: Response) => {
  try {
    const articleTopNew = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        labels: true,
        likes: true,
        bookmarks: true,
      },
    });

    return res.json({ articleTopNew });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

router.get("/all/tweets/order/like", async (req: Request, res: Response) => {
  try {
    const tweets = await prisma.tweet.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        likes: true,
      },
    });
    const tweetsTopLike = tweets.sort(
      (a, b) => b.likes.length - a.likes.length
    );

    return res.json({ tweetsTopLike });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

router.get("/all/tweets/order/new", async (req: Request, res: Response) => {
  try {
    const tweetsTopNew = await prisma.tweet.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        likes: true
      }
    });

    return res.json({ tweetsTopNew });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

export default router;
