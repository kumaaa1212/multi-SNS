import express from "express";
import postRoute from "./router/post";
import chatRoute from "./router/chat";
import authRoute from "./router/auth";
import boardRoute from "./router/board";
import articleRoute from "./router/article";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 10000;
app.use(express.json());
dotenv.config();

const corsOptions = {
  origin: "https://tokotokoj-pmr6m0goj-kumaaa1212.vercel.app",
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

app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => console.log(`Listenings on port ${port}`));
