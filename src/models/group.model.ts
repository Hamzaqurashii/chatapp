import { model, Schema } from "mongoose";
import { group } from "../types/documents/group.document";

const groupSchema = new Schema(
  {
    groupName: String,
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    adminName: String,
  },
  { timestamps: true }
);

// groupSchema.index({
//   name: "text",
//   location: "text",
//   contactNumber: "text",
//   email: "text",
// });

export const Group = model<group>("Group", groupSchema);
