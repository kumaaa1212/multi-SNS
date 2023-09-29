import express from "express";
import postRoute from "./router/post";
import chatRoute from "./router/chat";
import authRoute from "./router/auth";
import boardRoute from "./router/board";
import articleRoute from "./router/article";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 8000;
app.use(express.json());
dotenv.config();

const corsOptions = {
  origin: "tokotokoj.vercel.app",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/api/post", postRoute);
app.use("/api/chat", chatRoute);
app.use("/api/auth", authRoute);
app.use("/api/board", boardRoute);
app.use("/api/article", articleRoute);

app.listen(port, () => console.log(`Listenings on port ${port}`));
