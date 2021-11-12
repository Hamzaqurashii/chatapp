import express from "express";
import CustomError from "../utils/error";
import { group } from "../types/documents/group.document";
import {
  deleteReqGroup,
  getReqGroup,
  saveReqGroup,
  updateReqGroup,
  getReqGroupByUserID,
} from "../types/requests/group.request";
import { groupResponse } from "../types/responses/group.response";
import { GroupController } from "../controllers/group.controller";
import { checkAdmin } from "../utils/admin.authentication.middleware.function";

const Route: any = {
  "/getGroup": async (req: any, res: any, next: any) => {
    try {
      const reqGroup: getReqGroup = req.body;
      const Group: groupResponse = await new GroupController().getGroup(
        reqGroup
      );
      res.send(Group);
    } catch (error) {
      next(new CustomError(404, "Group not found"));
    }
  },
  "/getGroupByUserID": async (req: any, res: any, next: any) => {
    try {
      const reqGroup: getReqGroupByUserID = req.body;
      // console.log("req",reqGroup)
      const Group: groupResponse = await new GroupController().getReqGroupByUserID(
        reqGroup
      );
      res.send(Group);
    } catch (error) {
      next(new CustomError(404, "Group not found"));
    }
  },
  "/saveGroup": async (req: any, res: any, next: any) => {
    const reqGroup: saveReqGroup = req.body;

    checkAdmin(reqGroup.adminName, reqGroup.adminPassword)
      .then(async (response) => {
        const Group: groupResponse = await new GroupController().saveGroup(
          reqGroup
        );
        res.send(Group);
      })
      .catch((err) => {
        next(new CustomError(404, "Admin not found"));
      });

    // .then((response) => {
    //   console.log(response);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    // const Group: groupResponse = await new GroupController().saveGroup(reqGroup);
    // res.send(Group);
  },
  "/updateGroup": async (req: any, res: any, next: any) => {
    try {
      const reqGroup: updateReqGroup = req.body;
      const Group: updateReqGroup = await new GroupController().updateGroup(
        reqGroup
      );
      res.send(Group);
    } catch (error) {
      next(new CustomError(404, "group id not found"));
    }
  },
  "/deleteGroup": async (req: any, res: any, next: any) => {
    try {
      const reqGroup: deleteReqGroup = req.body;
      const Group: deleteReqGroup | any =
        await new GroupController().deleteGroup(reqGroup);
      res.send(Group);
    } catch (error) {
      next(new CustomError(404, "group id not found"));
    }
  },
  "/getAllGroups": async (req: any, res: any, next: any) => {
    const Group = await new GroupController().getAllGroups();
    res.send(Group);
  },
};

class GroupRoute {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.route();
  }
  route() {
    this.router.use("/", (req, res, next) => {
      const path = req.path;
      Route[path](req, res, next);
    });
  }
}

export const GroupRouteApi = new GroupRoute().router;
