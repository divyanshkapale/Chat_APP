import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getAllContacts,getMessageByUserId, sendMessage,getChatPartner } from "../controller/message.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();
router.use(arcjetProtection,protectedRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartner);
router.get("/:id", getMessageByUserId);
router.post("/send/:id",sendMessage);
export default router;

