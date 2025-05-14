export type TUser = {
  id: number;
  full_name: string;
  image: string;
  fullname: string;
  role: TRoles;
  email: string;
};

export type TRoles = "customer" | "manager" | "employee";
