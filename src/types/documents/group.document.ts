import { Document } from "mongoose";

export interface group extends Document {
  _id: string;
  groupName: string;
  users: any[];
  adminName: string;
  adminPassword: string;
  createdAt?: string;
  updatedAt?: string;
}
