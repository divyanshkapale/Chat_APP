import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// Deployment Logic
const frontendPath = path.join(__dirname, "../../frontend/dist");

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Expected Frontend Path:", frontendPath);

if (fs.existsSync(frontendPath)) {
  console.log("Frontend build found. Serving static files.");
  app.use(express.static(frontendPath));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  console.log("Frontend build NOT found at:", frontendPath);
  app.get("/", (req, res) => {
    res.status(200).send(`
      <div style="font-family: system-ui, sans-serif; padding: 2rem; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h1 style="color: #e11d48; margin-top: 0;">Deployment Status: Incomplete</h1>
        <p>The backend is running successfully, but the frontend build could not be found.</p>
        
        <div style="background: #f1f5f9; padding: 1rem; border-radius: 4px; margin: 1.5rem 0;">
            <p style="margin: 0; font-weight: bold;">Debug Info:</p>
            <ul style="margin: 0.5rem 0 0; padding-left: 1.5rem; color: #475569;">
                <li><strong>Backend Path:</strong> ${__dirname}</li>
                <li><strong>Looking for Frontend at:</strong> ${frontendPath}</li>
                <li><strong>NODE_ENV:</strong> ${process.env.NODE_ENV || 'undefined'}</li>
            </ul>
        </div>

        <h3>Possible Causes:</h3>
        <ul style="color: #475569;">
            <li>The <code>npm run build</code> command didn't run effectively.</li>
            <li>The directory structure on the server is different than expected.</li>
            <li>The build output directory is not named <code>dist</code>.</li>
        </ul>
      </div>
    `);
  });
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
