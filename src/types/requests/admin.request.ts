export interface saveReqAdmin {
  name: string;
  password: string;
}
export interface updateReqAdmin {
  _id: string;
  name: string;
  password: string;
}

export interface deleteReqAdmin {
  _id: string;
}
export interface getReqAdmin {
  _id: string;
}
export interface getReqAdminByUserNameAndPassword {
  name: string;
  password: string;
}
