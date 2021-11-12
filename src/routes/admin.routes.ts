import express from "express";
import CustomError from "../utils/error";
import { admin } from "../types/documents/admin.document";
import {
  deleteReqAdmin,
  getReqAdmin,
  saveReqAdmin,
  updateReqAdmin,
  getReqAdminByUserNameAndPassword,
} from "../types/requests/admin.request";
import { adminResponse } from "../types/responses/admin.response";
import { AdminController } from "../controllers/admin.controller";

const Route: any = {
  "/getAdmin": async (req: any, res: any, next: any) => {
    try {
      const reqAdmin: getReqAdmin = req.body;
      const Admin: adminResponse = await new AdminController().getAdmin(
        reqAdmin
      );
      res.send(Admin);
    } catch (error) {
      next(new CustomError(404, "Admin not found"));
    }
  },
  "/getAdminByUserNameAndPasword": async (req: any, res: any, next: any) => {
    try {
      const reqAdmin: getReqAdminByUserNameAndPassword = req.body;
      const Admin: adminResponse =
        await new AdminController().getAdminByUserNameAndPasword(reqAdmin);
      res.send(Admin);
    } catch (error) {
      next(new CustomError(404, "Admin not found"));
    }
  },
  "/saveAdmin": async (req: any, res: any, next: any) => {
    const reqAdmin: saveReqAdmin = req.body;
    const Admin: adminResponse = await new AdminController().saveAdmin(
      reqAdmin
    );
    res.send(Admin);
  },
  "/updateAdmin": async (req: any, res: any, next: any) => {
    try {
      const reqAdmin: updateReqAdmin = req.body;
      const Admin: updateReqAdmin = await new AdminController().updateAdmin(
        reqAdmin
      );
      res.send(Admin);
    } catch (error) {
      next(new CustomError(404, "admin id not found"));
    }
  },
  "/deleteAdmin": async (req: any, res: any, next: any) => {
    try {
      const reqAdmin: deleteReqAdmin = req.body;
      const Admin: deleteReqAdmin | any =
        await new AdminController().deleteAdmin(reqAdmin);
      res.send(Admin);
    } catch (error) {
      next(new CustomError(404, "admin id not found"));
    }
  },
  "/getAllAdmins": async (req: any, res: any, next: any) => {
    const Admin = await new AdminController().getAllAdmins();
    res.send(Admin);
  },
};

class AdminRoute {
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

export const AdminRouteApi = new AdminRoute().router;
