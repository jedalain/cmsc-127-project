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

export const reviewSchema = z.object({
  title: z.string().min(1, "Title is required"),
  comment: z.string().min(60, "Review must be at least 60 characters"),
  rating: z.number().min(1, "Rating must be between 1 and 5").max(5, "Rating must be between 1 and 5"),
})
export type reviewData = z.infer<typeof reviewSchema>;
export type reviewErrors = ZodError<FormData>;

export const establishmentSchema = z.object({
  name: z.string().min(1, "Name of establishment is required"),
  address: z.string().min(1, "Address is required"),
})
export type establishmentData = z.infer<typeof establishmentSchema>;
export type establishmentErrors = ZodError<FormData>;

export const foodItemSchema = z.object({
  name: z.string().min(1, "Name of food is required"),
  classification: z.string().min(1, "Indicate the type of food"),
  price: z.number()
        .min(1, "Indicate price of food")
        .positive("Invalid price")
        .refine(value => Number.isFinite(value) && value >= 0, {
          message: "Price must be a non-negative number"
        }),
})
export type foodItemData = z.infer<typeof foodItemSchema>;
export type foodItemErrors = ZodError<FormData>;