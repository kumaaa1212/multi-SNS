const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.post("/register", async (req, res) => {
  const { Icon, username, authId } = req.body;
  const user = await prisma.user.create({
    data: {
      username: username,
      authId: authId,
      Icon: Icon,
    },
  });
  // ここではkeyを入れている。そして非同期処理を行う
  // username:usernameとしなくていい。省略しているだけ。
  return res.json({ user });
});
// ログインはpostで行う
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!user) {
    return res.json({ message: "user not found" });
  }
  if (!passwordValid) {
    return res.json({ message: "password is wrong" });
  }
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return res.json({ token });
});

router.post("/auth/follow/:postId", async (req, res) => {
  const { postId } = req.params;
  const { authorId } = req.query;

  try {
    // Find the user to follow
    const userToFollow = await prisma.user.findUnique({
      where: {
        authorId: authorId,
      },
    });

    // Find the follower user
    const follower = await prisma.user.findUnique({
      where: {
        authorId: postId,
      },
    });

    if (!userToFollow || !follower) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      follower.following.some((followingId) => followingId === userToFollow.id)
    ) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    await prisma.user.update({
      where: {
        id: follower.id,
      },
      data: {
        following: {
          connect: {
            id: userToFollow.id,
          },
        },
      },
    });

    await prisma.user.update({
      where: {
        id: userToFollow.id,
      },
      data: {
        followers: {
          connect: {
            id: follower.id,
          },
        },
      },
    });

    return res.status(200).json({ message: "Successfully followed user" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
