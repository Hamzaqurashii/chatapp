import express from "express";
import CustomError from "../utils/error";
import { user } from "../types/documents/user.document";
import {
  deleteReqUser,
  getReqUser,
  saveReqUser,
  updateReqUser,
} from "../types/requests/user.request";
import { userResponse } from "../types/responses/user.response";
import { UserController } from "../controllers/user.controller";
import { checkAdmin } from "../utils/admin.authentication.middleware.function";

const Route: any = {
  "/getUser": async (req: any, res: any, next: any) => {
    try {
      const reqUser: getReqUser = req.body;
      const User: userResponse = await new UserController().getUser(reqUser);
      res.send(User);
    } catch (error) {
      next(new CustomError(404, "User not found"));
    }
  },
  "/saveUser": async (req: any, res: any, next: any) => {
    const reqUser: saveReqUser = req.body;

    checkAdmin(reqUser.adminName, reqUser.adminPassword)
      .then(async (response) => {
        const User: userResponse = await new UserController().saveUser(reqUser);
        res.send(User);
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
    // const User: userResponse = await new UserController().saveUser(reqUser);
    // res.send(User);
  },
  "/updateUser": async (req: any, res: any, next: any) => {
    try {
      const reqUser: updateReqUser = req.body;
      const User: updateReqUser = await new UserController().updateUser(
        reqUser
      );
      res.send(User);
    } catch (error) {
      next(new CustomError(404, "user id not found"));
    }
  },
  "/deleteUser": async (req: any, res: any, next: any) => {
    try {
      const reqUser: deleteReqUser = req.body;
      const User: deleteReqUser | any = await new UserController().deleteUser(
        reqUser
      );
      res.send(User);
    } catch (error) {
      next(new CustomError(404, "user id not found"));
    }
  },
  "/getAllUsers": async (req: any, res: any, next: any) => {
    const User = await new UserController().getAllUsers();
    res.send(User);
  },
};

class UserRoute {
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

export const UserRouteApi = new UserRoute().router;
