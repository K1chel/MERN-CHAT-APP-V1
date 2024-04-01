import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

import { app, io, server } from "./socket/socket.js";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import messagesRoutes from "./routes/message.routes.js";

import "dotenv/config";
import "colors";

const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messagesRoutes);

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// start server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`.rainbow.bold);
});
