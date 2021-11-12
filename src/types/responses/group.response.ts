export interface groupResponse {
  _id: string;
  groupName: string;
  users: any[];
  adminName: string;
  adminPassword: string;
  createdAt?: string;
  updatedAt?: string;
}
