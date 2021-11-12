import { user } from "../types/documents/user.document";
import { User } from "../models/user.model";
export class mainUser {
  constructor() {}
  getUser = async (_id: string) => {
    return User.findById(_id);
  };
  saveUser = async (user: user) => {
    return new User(user).save();
  };
  updateUser = async (user: user) => {
    return User.findByIdAndUpdate(user._id, user, { new: true });
  };
  deleteUser = async (_id: string) => {
    return User.findByIdAndDelete(_id);
  };
  getAllUsers = async () => {
    return User.find();
  };
}
