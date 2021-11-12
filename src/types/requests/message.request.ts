export interface saveReqMessage {
  message: string;
  user: string;
  group: string;
}
export interface updateReqMessage {
  _id: string;
  message: string;
  user: string;
  group: string;
}
export interface deleteReqMessage {
  _id: string;
}
export interface getReqMessage {
  _id: string;
}

export interface getReqMessageByAnyKeyWord {
  word: string;
  adminName: string;
  adminPassword: string;
}
export interface getReqMessageByGroupID {
  id: string;
  adminName: string;
  adminPassword: string;
}
