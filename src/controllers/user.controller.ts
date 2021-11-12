import { user } from "../types/documents/user.document";
import {
  deleteReqUser,
  getReqUser,
  saveReqUser,
  updateReqUser,
} from "../types/requests/user.request";
import { userResponse } from "../types/responses/user.response";
import { mainUser } from "../repositories/user.repository";
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

@Route("user")
@Tags("user")
export class UserController {
  constructor() {}
  @Post("/getUser")
  async getUser(
    @Body() getReq: getReqUser
  ): Promise<userResponse> {
    const User: user | any =
      await new mainUser().getUser(getReq._id);
    if (User === null) throw new CustomError(404, "User not found");
    return <userResponse>User;
  }
  @Post("/saveUser")
  async saveUser(
    @Body() saveReq: saveReqUser
  ): Promise<userResponse> {
    const User: user = await new mainUser().saveUser(
      <user>saveReq
    );
    return <userResponse>User;
  }
  @Post("/updateUser")
  async updateUser(
    @Body() updateReq: updateReqUser
  ): Promise<userResponse> {
    const User: user | any =
      await new mainUser().updateUser(<user>updateReq);
    if (User === null) throw new CustomError(404, "user not found");
    return <userResponse>User;
  }
  @Delete("/deleteUser")
  @SuccessResponse("200", "data deleted")
  async deleteUser(@Body() getReq: deleteReqUser) {
    await new mainUser().deleteUser(getReq._id);
  }
  @Post("/getAllUsers")
  async getAllUsers(): Promise<userResponse[]> {
    const User: user[] =
      await new mainUser().getAllUsers();
    return <userResponse[]>User;
  }
}
