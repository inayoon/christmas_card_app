import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import cardRoutes from "./routes/card.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => console.log(error));

const __dirname = path.resolve();
const app = express();

//여기부터 // app.use(express.static(path.join(__dirname, "/client/dist")));
// app.use(express.static(path.join(__dirname, "client", "dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// 여기까지});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/card", cardRoutes);

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    // API 요청은 클라이언트 사이드 라우팅에 영향을 주지 않음
    return res.status(404).send("Not Found");
  }

  // 그 외의 경우에는 클라이언트 사이드 라우팅을 위해 index.html을 반환
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
