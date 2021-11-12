import { Document } from "mongoose";

export interface message extends Document {
  _id: string;
  message: string;
  user: string;
  group: string;
  createdAt?: string;
  updatedAt?: string;
}
