import { admin } from "../types/documents/admin.document";
import {
  deleteReqAdmin,
  getReqAdmin,
  saveReqAdmin,
  updateReqAdmin,
  getReqAdminByUserNameAndPassword,
} from "../types/requests/admin.request";
import { adminResponse } from "../types/responses/admin.response";
import { mainAdmin } from "../repositories/admin.repository";
import CustomError from "../utils/error";
import {
  Get,
  Put,
  Post,
  Delete,
  Route,
  Tags,
  Body,
  Path,
  SuccessResponse,
} from "tsoa";

@Route("admin")
@Tags("admin")
export class AdminController {
  constructor() {}
  @Post("/getAdmin")
  async getAdmin(@Body() getReq: getReqAdmin): Promise<adminResponse> {
    const Admin: admin | any = await new mainAdmin().getAdmin(getReq._id);
    if (Admin === null) throw new CustomError(404, "Admin not found");
    return <adminResponse>Admin;
  }
  @Post("/getAdminByUserNameAndPasword")
  async getAdminByUserNameAndPasword(
    @Body() getReq: getReqAdminByUserNameAndPassword
  ): Promise<adminResponse> {
    const Admin: admin | any =
      await new mainAdmin().getAdminByUserNameAndPasword(
        getReq.name,
        getReq.password
      );
    if (Admin === null) throw new CustomError(404, "Admin not found");
    return <adminResponse>Admin;
  }
  @Post("/saveAdmin")
  async saveAdmin(@Body() saveReq: saveReqAdmin): Promise<adminResponse> {
    const Admin: admin = await new mainAdmin().saveAdmin(<admin>saveReq);
    return <adminResponse>Admin;
  }
  @Post("/updateAdmin")
  async updateAdmin(@Body() updateReq: updateReqAdmin): Promise<adminResponse> {
    const Admin: admin | any = await new mainAdmin().updateAdmin(
      <admin>updateReq
    );
    if (Admin === null) throw new CustomError(404, "admin not found");
    return <adminResponse>Admin;
  }
  @Delete("/deleteAdmin")
  @SuccessResponse("200", "data deleted")
  async deleteAdmin(@Body() getReq: deleteReqAdmin) {
    await new mainAdmin().deleteAdmin(getReq._id);
  }
  @Post("/getAllAdmins")
  async getAllAdmins(): Promise<adminResponse[]> {
    const Admin: admin[] = await new mainAdmin().getAllAdmins();
    return <adminResponse[]>Admin;
  }
}
