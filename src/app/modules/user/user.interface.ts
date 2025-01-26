import { USER_ROLE } from "./user.constant";


export type TUser = {
    name: string;
    email: string;
    password?: string;
    image: string;
    role: "admin" | "user";
    address?: string;
    userType?: "free" | "premium";
    totalSpends?: number;
};
export type TUserRole = keyof typeof USER_ROLE
