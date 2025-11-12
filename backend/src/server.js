import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.route.js";
const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
