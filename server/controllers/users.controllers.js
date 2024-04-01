import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getSidebarUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    if (!currentUser) {
      return res
        .status(404)
        .json({ error: "Unauthorized, no current user found" });
    }

    const sidebarUsers = await User.find({
      _id: { $ne: req.user._id },
    }).select("-password");

    if (!sidebarUsers) {
      return res.status(404).json({ error: "No sidebar users found" });
    }

    res.status(200).json(sidebarUsers);
  } catch (error) {
    console.log(`Error in getSidebarUsers controller: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  const { username } = req.body;
  let { avatar } = req.body;
  const currentUserId = req.user._id;
  try {
    let user = await User.findById(currentUserId);

    if (avatar) {
      if (user.avatar) {
        await cloudinary.uploader.destroy(
          user.avatar.split("/").pop().split(".")[0]
        );
      }
      const uploadedImage = await cloudinary.uploader.upload(avatar);
      avatar = uploadedImage.secure_url;
    }

    user.username = username || user.username;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(`Error in updateProfile controller: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};
