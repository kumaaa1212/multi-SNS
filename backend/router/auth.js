const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.post("/register", async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password:hashedPassword,
        email,
      }})
      // ここではkeyを入れている。そして非同期処理を行う
      // username:usernameとしなくていい。keyを設定して、勝手に型にあったものを入れてくれる
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
  module.exports = router;

