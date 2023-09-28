import express from "express";
import postRoute from "./src/router/post";
import chatRoute from "./src/router/chat";
import authRoute from "./src/router/auth";
import boardRoute from "./src/router/board";
import articleRoute from "./src/router/article";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT;
// ミドルウェアの設定
app.use(express.json());
dotenv.config();

const corsOptions = {
  origin: "https://tokotokoj.vercel.app",
  methods: ["GET", "POST", "DELETE", "PUT"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/api/post", postRoute);
app.use("/api/chat", chatRoute);
app.use("/api/auth", authRoute);
app.use("/api/board", boardRoute);
app.use("/api/article", articleRoute);

app.listen("https://backend-dgjc.onrender.com/api", () => console.log(`Listening on port ${port}`));
