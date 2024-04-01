import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized , no token in coookies" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized , token failed" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Unauthorized , no user found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(`Error in protectedRoute: ${error.message}`);
    res.status(401).json({ error: "Server error" });
  }
};
