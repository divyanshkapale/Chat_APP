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
import { fileURLToPath } from "url";

// ... existing imports ...
// (We keep the imports as they are in the file, we are just replacing the block below app.use routes)

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("__dirname:", __dirname);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  console.log("Serving static files from:", frontendPath);

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
  connectDB();
});
