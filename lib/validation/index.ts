import { z } from "zod";

const isBrowser = typeof window !== "undefined";

export const AddListingFormSchema = z.object({
  transactionType: z.enum(["იყიდება", "ქირავდება"], {
    required_error: "გთხოვთ აირჩიეთ ტრანზაქციის ტიპი",
  }),
  location: z.string().min(2, "მინიმუმ ორი სიმბოლო"),
  region: z.string().min(1, "სავალდებულო ველი"),
  city: z.string().min(1, "სავალდებულო ველი"),
  zip_code: z.string()
    .min(1, "სავალდებულო ველი")
    .regex(/^\d{4}(-\d{4})?$/, "მხოლოდ რიცხვები"), // Example regex for a US postal code
  area: z.string()
    .min(1, "სავალდებულო ველი")
    .regex(/^\d+$/, "მხოლოდ ციფრები"),
  price: z.string()
    .min(1, "სავალდებულო ველი")
    .regex(/^\d+$/, "მხოლოდ ციფრები"),
  bedrooms: z.string()
    .min(1, "სავალდებულო ველი")
    .regex(/^\d+$/, "მხოლოდ ციფრები"),
  description: z.string()
    .min(1, "სავალდებულო ველი")
    .refine((val) => val.trim().split(/\s+/).filter(Boolean).length >= 5, {
      message: "მინიმუმ 5 სიტყვა",
    }),
  image: isBrowser
    ? z.instanceof(File).refine((file) => file.size > 0, {
        message: "გთხოვთ ატვირთოთ გამოსახულება",
      })
    : z.any().refine((file) => file.size > 0, {
        message: "File must be uploaded",
      }),
  agent: z.string().min(1, "სავალდებულო ველი"),
});

export const AddAgentFormSchema = z.object({
  name: z.string().min(2, "მინიმუმ ორი სიმბოლო"),
  username: z.string().min(2, "მინიმუმ ორი სიმბოლო"),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@redberry\.ge$/, {
    message: "გამოიყენეთ @redberry.ge ფოსტა",
  }),
  phone_number: z.string()
    .min(1, "მხოლოდ ციფრები")
    .regex(/^\d+$/, "მხოლოდ რიცხვები"),
  image: isBrowser
    ? z.instanceof(File).refine((file) => file.size > 0, {
        message: "გთხოვთ ატვირთოთ გამოსახულება",
      })
    : z.any().refine((file) => file.size > 0, {
        message: "File must be uploaded",
      }),
});
