import { model, Schema } from "mongoose";
import { admin } from "../types/documents/admin.document";

const adminSchema = new Schema(
  {
    name: String,
    password: String,
  },
  { timestamps: true }
);

// adminSchema.index({
//   name: "text",
//   location: "text",
//   contactNumber: "text",
//   email: "text",
// });

export const Admin = model<admin>("Admin", adminSchema);
