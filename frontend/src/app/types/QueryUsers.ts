import { TRoles } from "./User";

export type TUserQuery = {
  role?: TRoles;
  page?: number;
  orderBy?: "asc" | "desc";
};
