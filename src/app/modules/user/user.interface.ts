import { USER_ROLE } from "./user.constant";


export type TUser = {
    name: string;
    email: string;
    password?: string;
    image: string;
    role: "admin" | "user";
    address?: string;
    resetToken?: string;
};
export type TUserRole = keyof typeof USER_ROLE
