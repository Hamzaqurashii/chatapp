import { message } from "../types/documents/message.document";
import { Message } from "../models/message.model";
export class mainMessage {
  constructor() {}
  getMessage = async (_id: string) => {
    return Message.findById(_id);
  };
  getMessageByAnyKeyWord = async (word: string) => {
    var character = new RegExp(`^${word}`, "gi");
    return Message.find({
      $or: [{ $text: { $search: character.toString() } }],
    }).populate("user");
  };
  getMessageByGroupID = async (id: string) => {
    return Message.find({ group: id }).populate("user").populate("group");
  };
  saveMessage = async (message: message) => {
    return new Message(message).save();
  };
  updateMessage = async (message: message) => {
    return Message.findByIdAndUpdate(message._id, message, { new: true });
  };
  deleteMessage = async (_id: string) => {
    return Message.findByIdAndDelete(_id);
  };
  getAllMessages = async () => {
    return Message.find();
  };
}
