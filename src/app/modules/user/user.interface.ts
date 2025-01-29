import { USER_ROLE } from "./user.constant";

export type TSubscriptionInfo = {
    tnxId: string;
    purchaseTime: string;
    expiryTime: string;
    amount: number
}

export type TUser = {
    name: string;
    email: string;
    password?: string;
    image: string;
    role: "admin" | "user";
    address?: string;
    userType?: "free" | "premium";
    totalSpends?: number;
    subScriptionInfo?: TSubscriptionInfo[]
};
export type TUserRole = keyof typeof USER_ROLE
