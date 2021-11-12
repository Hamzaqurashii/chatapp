import { admin } from "../types/documents/admin.document";
import { Admin } from "../models/admin.model";
export class mainAdmin {
  constructor() {}
  getAdmin = async (_id: string) => {
    return Admin.findById(_id);
  };
  saveAdmin = async (admin: admin) => {
    return new Admin(admin).save();
  };
  updateAdmin = async (admin: admin) => {
    return Admin.findByIdAndUpdate(admin._id, admin, { new: true });
  };
  deleteAdmin = async (_id: string) => {
    return Admin.findByIdAndDelete(_id);
  };
  getAllAdmins = async () => {
    return Admin.find();
  };
  getAdminByUserNameAndPasword = async (name: string, password: string) => {
    return Admin.findOne({ $and: [{ name: name }, { password: password }] });
  };
}
