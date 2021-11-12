import { AdminController } from "../controllers/admin.controller";

export async function checkAdmin(name: string, password: string) {
    const Admin = await new AdminController().getAdminByUserNameAndPasword({
      name: name,
      password: password,
    });
    return Admin;
  }