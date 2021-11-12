import { model, Schema } from "mongoose";
import { message } from "../types/documents/message.document";

const messageSchema = new Schema(
  {
    message: String,
    user: String,
    group: String,
  },
  { timestamps: true }
);

messageSchema.index({
  message: "text",
});

export const Message = model<message>("Message", messageSchema);
