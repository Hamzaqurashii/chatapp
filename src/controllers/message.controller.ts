import { message } from "../types/documents/message.document";
import {
  deleteReqMessage,
  getReqMessage,
  saveReqMessage,
  updateReqMessage,
  getReqMessageByAnyKeyWord,
  getReqMessageByGroupID,
} from "../types/requests/message.request";
import { messageResponse } from "../types/responses/message.response";
import { mainMessage } from "../repositories/message.repository";
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

@Route("message")
@Tags("message")
export class MessageController {
  constructor() {}
  @Post("/getMessage")
  async getMessage(@Body() getReq: getReqMessage): Promise<messageResponse> {
    const Message: message | any = await new mainMessage().getMessage(
      getReq._id
    );
    if (Message === null) throw new CustomError(404, "Message not found");
    return <messageResponse>Message;
  }
  @Post("/getMessageByAnyKeyWord")
  async getMessageByAnyKeyWord(
    @Body() getReq: getReqMessageByAnyKeyWord
  ): Promise<messageResponse> {
    const Message: message | any =
      await new mainMessage().getMessageByAnyKeyWord(getReq.word);
    if (Message === null) throw new CustomError(404, "Message not found");
    return <messageResponse>Message;
  }
  @Post("/getMessageByGroupID")
  async getMessageByGroupID(
    @Body() getReq: getReqMessageByGroupID
  ): Promise<messageResponse> {
    const Message: message | any = await new mainMessage().getMessageByGroupID(
      getReq.id
    );
    if (Message === null) throw new CustomError(404, "Message not found");
    return <messageResponse>Message;
  }
  @Post("/saveMessage")
  async saveMessage(@Body() saveReq: saveReqMessage): Promise<messageResponse> {
    const Message: message = await new mainMessage().saveMessage(
      <message>saveReq
    );
    return <messageResponse>Message;
  }
  @Post("/updateMessage")
  async updateMessage(
    @Body() updateReq: updateReqMessage
  ): Promise<messageResponse> {
    const Message: message | any = await new mainMessage().updateMessage(
      <message>updateReq
    );
    if (Message === null) throw new CustomError(404, "message not found");
    return <messageResponse>Message;
  }
  @Delete("/deleteMessage")
  @SuccessResponse("200", "data deleted")
  async deleteMessage(@Body() getReq: deleteReqMessage) {
    await new mainMessage().deleteMessage(getReq._id);
  }
  @Post("/getAllMessages")
  async getAllMessages(): Promise<messageResponse[]> {
    const Message: message[] = await new mainMessage().getAllMessages();
    return <messageResponse[]>Message;
  }
}
