export interface saveReqGroup {
  groupName: string;
  users: any[];
  adminName: string;
  adminPassword: string;
}
export interface updateReqGroup {
  _id: string;
  groupName: string;
  users: any[];
  adminName: string;
  adminPassword: string;
}
export interface deleteReqGroup {
  _id: string;
}
export interface getReqGroup {
  _id: string;
}
export interface getReqGroupByUserID {
  _id: string;
}
