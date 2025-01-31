import { TFollowerInfo, TSubscriptionInfo } from "../user/user.interface";

export type TLoginUser = {
    name: string;
    email: string;
    password: string;
    image: string;
    role: "admin" | "user";
    address: string;
    userType?: "free" | "premium";
    totalSpends?: number;
    subScriptionInfo?: TSubscriptionInfo[];
    followers?: TFollowerInfo[];
}