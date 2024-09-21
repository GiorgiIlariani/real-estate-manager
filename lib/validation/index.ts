import { z } from "zod";

const isBrowser = typeof window !== "undefined";

// Utility to check if a string is Base64
const isValidBase64 = (str: string) => {
  const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
  return base64Regex.test(str);
};

export const AddListingFormSchema = z.object({
  transactionType: z.enum(["იყიდება", "ქირავდება"], {
    required_error: "გთხოვთ აირჩიეთ ტრანზაქციის ტიპი",
  }),
  location: z.string().min(2, "მინიმუმ ორი სიმბოლო"),
  region: z.string().min(1, "სავალდებულო ველი"),
  city: z.string().min(1, "სავალდებულო ველი"),
  zip_code: z.string()
    .min(1, "სავალდებულო ველი")
    .regex(/^\d{4}(-\d{4})?$/, "მხოლოდ რიცხვები"), // Adjust this regex as needed
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
    .refine(val => val.trim().split(/\s+/).length >= 5, {
      message: "მინიმუმ 5 სიტყვა",
    }),
  image: isBrowser
    ? z.union([
        z.instanceof(File).refine(file => file.size > 0 && file.size <= 1000000, {
          message: "გთხოვთ ატვირთოთ გამოსახულება, მაქსიმალური ზომა: 1 მბ",
        }),
        z.string().refine(val => isValidBase64(val), {
          message: "სურათის ფორმატი არასწორია",
        }),
      ])
    : z.any(),
  agent: z.string().min(1, "სავალდებულო ველი"),
});

export const AddAgentFormSchema = z.object({
  name: z.string().min(2, "მინიმუმ ორი სიმბოლო"),
  username: z.string().min(2, "მინიმუმ ორი სიმბოლო"),
  email: z.string()
    .email("შეიყვანეთ ვალიდური ელ-ფოსტა")
    .regex(/^[a-zA-Z0-9._%+-]+@redberry\.ge$/, {
      message: "გამოიყენეთ @redberry.ge ფოსტა",
    }),
  phone_number: z.string()
    .min(9, "მხოლოდ ციფრები")
    .regex(/^5\d{8}$/, "ნომერი უნდა იყოს ფორმატით 5XXXXXXXX"),
  image: isBrowser
    ? z.union([
        z.instanceof(File).refine(file => file.size > 0 && file.size <= 1000000, {
          message: "გთხოვთ ატვირთოთ გამოსახულება, მაქსიმალური ზომა: 1 მბ",
        }),
        z.string().refine(val => isValidBase64(val), {
          message: "სურათის ფორმატი არასწორია",
        }),
      ])
    : z.any(),
});
