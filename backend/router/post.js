const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username:username,
        password:hashedPassword,
        email:email,
      }})
      // ここではkeyを入れている。そして非同期処理を行う
      // username:usernameとしなくていい。省略しているだけ。
   return res.json({user});
  })
// ログインはpostで行う
router.post('/login', async (req, res) => {
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
})


router.get("/tweet", async (req, res) => {
  const tweet = await prisma.tweet.findMany({
    include: {
      user: true,
    },
  });
  return res.json({ tweet });
})

router.post("/tweet", async (req, res) => {
  const { content, authorId } = req.body;
  const tweet = await prisma.tweet.create({
    data: {
      content,
      authorId,
    },
  });
  return res.json({ tweet });
})
router.post('/message', async (req, res) => {
  const { roomId } = req.query;

})
  module.exports = router;
