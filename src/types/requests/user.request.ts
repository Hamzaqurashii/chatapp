export interface saveReqUser {
  userName: string;
  email: string;
  password: string;
  adminName: string;
  adminPassword: string;
}
export interface updateReqUser {
  _id: string;
  userName: string;
  email: string;
  password: string;
  adminName: string;
  adminPassword: string;
}
export interface deleteReqUser {
  _id: string;
}
export interface getReqUser {
  _id: string;
}
