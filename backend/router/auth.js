const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/auth/follow/:authorId", async (req, res) => {
  const { authorId } = req.params;
  
});

module.exports = router;
