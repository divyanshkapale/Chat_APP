import dotenv from "dotenv";
dotenv.config(); // LOAD ENV FIRST ✔

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL, // now this works ✔
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());

import path from "path";

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
  connectDB();
});
