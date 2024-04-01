import express from "express";

import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  getMessages,
  sendMessage,
} from "../controllers/message.controllers.js";

const router = express.Router();

router.post("/send/:id", protectedRoute, sendMessage);
router.get("/:id", protectedRoute, getMessages);

export default router;
