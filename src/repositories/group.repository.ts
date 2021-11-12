import { group } from "../types/documents/group.document";
import { Group } from "../models/group.model";
import { Schema } from "mongoose";
export class mainGroup {
  constructor() {}
  getGroup = async (_id: string) => {
    return Group.findById(_id);
  };
  getGroupByUserID = async (_id: string) => {
    return Group.findOne({ users: _id }).populate("users");
  };
  saveGroup = async (group: group) => {
    return new Group(group).save();
  };
  updateGroup = async (group: group) => {
    return Group.findByIdAndUpdate(group._id, group, { new: true });
  };
  deleteGroup = async (_id: string) => {
    return Group.findByIdAndDelete(_id);
  };
  getAllGroups = async () => {
    return Group.find();
  };
}
