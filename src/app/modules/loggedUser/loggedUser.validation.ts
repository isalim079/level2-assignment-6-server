import { z } from "zod";

const LoggedUserValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  image: z.string().optional(),
  role: z.string(),
  address: z.string().optional(),
  token: z.string().nonempty("Token is required"),
});

export const LoggedUserValidation = {
   LoggedUserValidationSchema
};
