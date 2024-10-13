export type TLoginUser = {
    name: string;
    email: string;
    password: string;
    image: string;
    phone?: string;
    role: "admin" | "user";
    address: string;

}