import express from "express";
import postRoute from "./router/post";
import chatRoute from "./router/chat";
import authRoute from "./router/auth";
import boardRoute from "./router/board";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT;
app.use(express.json());
dotenv.config()

const corsOptions = {
  origin: "http://localhost:3002",
  methods: ["GET", "POST", "DELETE", "PUT"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/api/post", postRoute);
app.use("/api/chat", chatRoute);
app.use("/api/auth", authRoute);
app.use("/api/board", boardRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
