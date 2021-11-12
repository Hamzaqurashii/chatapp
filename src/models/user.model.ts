import { model, Schema } from "mongoose";
import { user } from "../types/documents/user.document";

const userSchema = new Schema(
  {
    userName: String,
    email: String,
    password: String,
    adminName: String,
  },
  { timestamps: true }
);

// userSchema.index({
//   name: "text",
//   location: "text",
//   contactNumber: "text",
//   email: "text",
// });

export const User = model<user>("User", userSchema);
