import { Document } from "mongoose";

export interface admin extends Document {
  _id: string;
  name: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}
