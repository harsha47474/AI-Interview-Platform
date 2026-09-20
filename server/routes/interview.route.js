import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  analyzeResume,
  finishInterview,
  generateQuestion,
  submitAnswer,
  getHistory,
  getReport,
} from "../controllers/interview.controller.js";
import { upload } from "../middlewares/multer.js";


const interviewRouter = express.Router();

interviewRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume);
interviewRouter.post("/generate-questions", isAuth, generateQuestion);
interviewRouter.post("/submit", isAuth, submitAnswer);
interviewRouter.post("/finish", isAuth, finishInterview);
interviewRouter.get("/history", isAuth, getHistory);
interviewRouter.get("/report/:interviewId", isAuth, getReport);

export default interviewRouter;
