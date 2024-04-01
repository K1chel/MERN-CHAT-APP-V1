import express from "express";

import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  getSidebarUsers,
  updateProfile,
} from "../controllers/users.controllers.js";

const router = express.Router();

router.get("/sidebar-users", protectedRoute, getSidebarUsers);
router.put("/profile-update", protectedRoute, updateProfile);

export default router;
