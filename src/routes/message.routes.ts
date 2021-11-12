import express from "express";
import CustomError from "../utils/error";
import { message } from "../types/documents/message.document";
import {
  deleteReqMessage,
  getReqMessage,
  saveReqMessage,
  updateReqMessage,
  getReqMessageByAnyKeyWord,
  getReqMessageByGroupID
} from "../types/requests/message.request";
import { messageResponse } from "../types/responses/message.response";
import { MessageController } from "../controllers/message.controller";
import { checkAdmin } from "../utils/admin.authentication.middleware.function";
import { checkUserInGroup } from "../utils/check.user.middleware.function";

const Route: any = {
  "/getMessage": async (req: any, res: any, next: any) => {
    try {
      const reqMessage: getReqMessage = req.body;
      const Message: messageResponse = await new MessageController().getMessage(
        reqMessage
      );
      res.send(Message);
    } catch (error) {
      next(new CustomError(404, "Message not found"));
    }
  },
  "/getMessageByAnyKeyWord": async (req: any, res: any, next: any) => {
    try {
      const reqMessage: getReqMessageByAnyKeyWord = req.body;
      checkAdmin(reqMessage.adminName, reqMessage.adminPassword)
        .then(async (response) => {
          const Message: messageResponse =
            await new MessageController().getMessageByAnyKeyWord(reqMessage);
          res.send(Message);
        })
        .catch((err) => {
          next(new CustomError(404, "Admin not found"));
        });
    } catch (error) {
      next(new CustomError(404, "Message not found"));
    }
  },
  "/getMessageByGroupID": async (req: any, res: any, next: any) => {
    try {
      const reqMessage: getReqMessageByGroupID = req.body;
      checkAdmin(reqMessage.adminName, reqMessage.adminPassword)
        .then(async (response) => {
          const Message: messageResponse =
            await new MessageController().getMessageByGroupID(reqMessage);
          res.send(Message);
        })
        .catch((err) => {
          next(new CustomError(404, "Admin not found"));
        });
    } catch (error) {
      next(new CustomError(404, "Message not found"));
    }
  },
  "/saveMessage": async (req: any, res: any, next: any) => {
    const reqMessage: saveReqMessage = req.body;

    checkUserInGroup(reqMessage.user)
      .then(async (response) => {
        const Message: messageResponse =
          await new MessageController().saveMessage(reqMessage);
        res.send(Message);
      })
      .catch((err) => {
        next(new CustomError(404, "no user found in this group with that ID"));
      });
  },
  "/updateMessage": async (req: any, res: any, next: any) => {
    try {
      const reqMessage: updateReqMessage = req.body;
      const Message: updateReqMessage =
        await new MessageController().updateMessage(reqMessage);
      res.send(Message);
    } catch (error) {
      next(new CustomError(404, "message id not found"));
    }
  },
  "/deleteMessage": async (req: any, res: any, next: any) => {
    try {
      const reqMessage: deleteReqMessage = req.body;
      const Message: deleteReqMessage | any =
        await new MessageController().deleteMessage(reqMessage);
      res.send(Message);
    } catch (error) {
      next(new CustomError(404, "message id not found"));
    }
  },
  "/getAllMessages": async (req: any, res: any, next: any) => {
    const Message = await new MessageController().getAllMessages();
    res.send(Message);
  },
};

class MessageRoute {
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

export const MessageRouteApi = new MessageRoute().router;
