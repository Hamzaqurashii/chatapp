import { group } from "../types/documents/group.document";
import {
  deleteReqGroup,
  getReqGroup,
  saveReqGroup,
  updateReqGroup,
  getReqGroupByUserID,
} from "../types/requests/group.request";
import { groupResponse } from "../types/responses/group.response";
import { mainGroup } from "../repositories/group.repository";
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

@Route("group")
@Tags("group")
export class GroupController {
  constructor() {}
  @Post("/getGroup")
  async getGroup(@Body() getReq: getReqGroup): Promise<groupResponse> {
    const Group: group | any = await new mainGroup().getGroup(getReq._id);
    if (Group === null) throw new CustomError(404, "Group not found");
    return <groupResponse>Group;
  }
  @Post("/getGroupByUserID")
  async getReqGroupByUserID(
    @Body() getReq: getReqGroupByUserID
  ): Promise<groupResponse> {
    // console.log("reqs",getReq)
    const Group: group | any = await new mainGroup().getGroupByUserID(
      getReq._id
    );
    if (Group === null) throw new CustomError(404, "Group not found");
    return <groupResponse>Group;
  }
  @Post("/saveGroup")
  async saveGroup(@Body() saveReq: saveReqGroup): Promise<groupResponse> {
    const Group: group = await new mainGroup().saveGroup(<group>saveReq);
    return <groupResponse>Group;
  }
  @Post("/updateGroup")
  async updateGroup(@Body() updateReq: updateReqGroup): Promise<groupResponse> {
    const Group: group | any = await new mainGroup().updateGroup(
      <group>updateReq
    );
    if (Group === null) throw new CustomError(404, "group not found");
    return <groupResponse>Group;
  }
  @Delete("/deleteGroup")
  @SuccessResponse("200", "data deleted")
  async deleteGroup(@Body() getReq: deleteReqGroup) {
    await new mainGroup().deleteGroup(getReq._id);
  }
  @Post("/getAllGroups")
  async getAllGroups(): Promise<groupResponse[]> {
    const Group: group[] = await new mainGroup().getAllGroups();
    return <groupResponse[]>Group;
  }
}
