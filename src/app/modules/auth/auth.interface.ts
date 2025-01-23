export type TLoginUser = {
    name: string;
    email: string;
    password: string;
    image: string;
    role: "admin" | "user";
    address: string;

}