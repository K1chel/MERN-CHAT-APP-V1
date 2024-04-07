import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      members: { $all: [id, senderId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log(`Error in getMessages controller: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    let { imageId } = req.body;
    const { id } = req.params; // receiverId
    const senderId = req.user._id;

    if (id === senderId.toString()) {
      return res
        .status(400)
        .json({ message: "You can't send message to yourself" });
    }

    let conversation = await Conversation.findOne({
      members: { $all: [id, senderId] },
    });

    if (!conversation) {
      // create new conversation between sender and receiver
      conversation = await Conversation.create({
        members: [id, senderId],
      });
    }

    if (imageId) {
      const uploadedImage = await cloudinary.uploader.upload(imageId);
      imageId = uploadedImage.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId: id,
      imageId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(id);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error in sendMessage controller: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};
