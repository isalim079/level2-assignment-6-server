import { z } from "zod";

const userValidationSchema = z.object({
    body: z.object({
        name: z.string().nonempty({
            message: "Name is required",
        }),
        email: z.string().email({
            message: "Invalid email address",
        }),
        password: z.string().optional(),
        image: z.string({
            invalid_type_error: "Please upload your image",
        }),

        phone: z.string().optional(),
        role: z.enum(["admin", "user"]),
        address: z.string().optional(),
    }),
});

export const UserValidation = {
    userValidationSchema,
};
