import * as z from "zod";

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Must be a string",
    })
    .email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});
