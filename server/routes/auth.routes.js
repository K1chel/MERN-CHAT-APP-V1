import express from "express";

import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.get("/current-user", protectedRoute, getCurrentUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);

export default router;
