import express from "express";
import "dotenv/config";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
// In production, CLIENT_ORIGIN is set to your deployed frontend URL.
// In development it falls back to Vite's default dev-server port.
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., curl, mobile apps) and listed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin '${origin}' not allowed`));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);

// ── Static Client Build (Production) ─────────────────────────────────────────
// When NODE_ENV=production, serve the built React app from /client/dist.
// For development, the Vite dev server handles frontend requests separately.
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDistPath));

  // SPA catch-all: return index.html for any non-API route
  // Note: Express 5 requires (.*) instead of bare * wildcard
  app.get("(.*)", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Colloquium AI Interview Platform — API Server running.");
  });
}

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
  connectDB();
});
