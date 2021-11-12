import express from "express";
import { AdminRouteApi } from "./admin.routes";
import { UserRouteApi } from "./user.routes";
import { GroupRouteApi } from "./group.routes";
import { MessageRouteApi } from "./message.routes";

export class MainRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.use("/admin", AdminRouteApi);
    this.router.use("/user", UserRouteApi);
    this.router.use("/group", GroupRouteApi);
    this.router.use("/message", MessageRouteApi);
  }
}
export const MainApi = new MainRouter().router;
