import * as z from "zod";

export const InformationFormValidation = z.object({
  fullname: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6)
    .max(32)
    .refine((val) => {
      const hasUpperCase = /[A-Z]/.test(val);
      const hasLowerCase = /[a-z]/.test(val);
      const hasNumber = /[0-9]/.test(val);
      const hasSpecialChar = /[^a-zA-Z0-9]/.test(val);
      return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    }, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const CategoryFormValidation = z.object({
  role: z.enum(["hustler", "supporter"]),
});

export const ProfileFormValidation = z.object({
  fullname: z.string().min(2, "Full name is required"),
  department: z.string().optional(),
  year: z.string().min(2, "Please select your year of study"),
  instagram: z.string().optional(),
  whatsapp: z
    .string()
    .regex(
      /^(\+?\d{8,15})$/,
      "Enter a valid WhatsApp number (8–15 digits, optional +)"
    ),
});
