import mongoose from "mongoose";
import { chatCollection } from "../../constants/index.js";

const chatSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const chatModel = mongoose.model(chatCollection, chatSchema);
