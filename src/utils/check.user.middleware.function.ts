import { GroupController } from "../controllers/group.controller";

export async function checkUserInGroup(id: string) {
  const Group = await new GroupController().getReqGroupByUserID({
    _id: id,
  });
  return Group;
}
