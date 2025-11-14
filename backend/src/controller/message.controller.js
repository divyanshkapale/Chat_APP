import Message from "../model/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../model/User.model.js";
export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    return res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in Get All Contacts", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(message);
  } catch (error) {
    console.log("Error in Get Message By UserId", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in Send Message", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getChatPartner = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });
    const chatPartnerIds = [...new Set(messages.map((msg) => {
      return msg.senderId.toString() === loggedInUserId.toString()
        ? msg.receiverId
        : msg.senderId;
    }))];
    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select(
      "-password"
    );
    return res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in Get Chat Partner", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
