const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");

const getAll = async (req, res, next) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching chats" });
  }
};

const create = async (req, res, next) => {
  const { sender, receiver, message } = req.body;
  try {
    const chat = new Chat({ sender, receiver, message });
    await chat.save();
    res.json(chat);
  } catch (error) {
    res.status(400).json({ error: "Error creating a chat message" });
  }
};

const updateByID = async (req, res, next) => {
  const chatId = req.params.id;
  const { message } = req.body;
  try {
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { message },
      { new: true }
    );
    res.json(chat);
  } catch (error) {
    res.status(400).json({ error: "Error updating the chat message" });
  }
};
const deleteByID = async (req, res, next) => {
  const chatId = req.params.id;
  try {
    await Chat.findByIdAndRemove(chatId);
    res.json({ message: "Chat message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the chat message" });
  }
};

module.exports = { getAll, create, updateByID, deleteByID };
