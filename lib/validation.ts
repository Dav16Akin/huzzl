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

export const SignInValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const CategoryFormValidation = z.object({
  role: z.enum(["hustler", "supporter"]),
});

export const ProfileFormValidation = z.object({
  businessname: z.string().min(2, "Business Name name is required"),
  department: z.string(),
  year: z.string().min(2, "Please select your year of study"),
  instagram: z.string().optional(),
  whatsapp: z
    .string()
    .regex(
      /^(\+?\d{8,15})$/,
      "Enter a valid WhatsApp number (8–15 digits, optional +)"
    ),
  profileImage: z.string().url(),
});
export const HustleCategories = [
  "Food",
  "Fashion",
  "Tech",
  "Art",
  "Design",
  "Photography",
  "Craft",
  "Tutoring",
  "Other",
] as const;

export const CreateFormValidation = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  category: z.enum(HustleCategories, {
    errorMap: () => ({ message: "Select a valid category." }),
  }),
  tags: z
    .array(z.string().min(1, "Tags cannot be empty"))
    .min(1, "At least one tag is required")
    .max(10, "You can add up to 10 tags"),
  price: z
    .object({
      min: z.coerce.number().min(0),
      max: z.coerce.number().min(0),
    })
    .refine((val) => val.max >= val.min, {
      message: "Max price should be greater than or equal to min price",
    }),
  images: z
    .array(z.string().url())
    .min(1, { message: "Upload at least 1 image." })
    .max(3, { message: "You can upload up to 3 images." }),
});
