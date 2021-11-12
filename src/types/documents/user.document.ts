import { Document } from "mongoose";

export interface user extends Document {
  _id: string;
  userName: string;
  email: string;
  password: string;
  adminName: string;
  adminPassword: string;
  createdAt?: string;
  updatedAt?: string;
}
