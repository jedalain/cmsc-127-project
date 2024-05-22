import { ZodError, z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Invalid password"),
});
export type signInData = z.infer<typeof signInSchema>;
export type signInErrors = ZodError<FormData>;

export const signUpSchema = z.object({
  fname: z.string().min(1, "First name is required"),
  mname: z.string(),
  lname: z.string().min(1, "Last name is required"),
  role: z.string().min(1, "Choose a role"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password should be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password should be at least 8 characters"),
})
.refine((data) => !/^\s*$/.test(data.fname), {
  message: "First name cannot be empty or contain only whitespace characters",
  path: ['fname']
})
.refine((data) => !/^\s*$/.test(data.lname), {
  message: "Last name cannot be empty or contain only whitespace characters",
  path: ['lname']
})
.refine((data) => data.confirmPassword === data.password, {
  message: "Password does not match",
  path: ["confirmPassword"],
});
export type signUpData = z.infer<typeof signUpSchema>;
export type signUpErrors = ZodError<FormData>;