import express from "express";
import "dotenv/config";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);

const PORT = process.env.PORT | 3000;

app.get("/", (req, res) => {
  res.send("This is my new Project. Working on an AI interview platform");
});

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
  connectDB();
});
