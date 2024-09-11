import { z } from "zod";

export const AddListingFormSchema = z.object({
  location: z.string().min(1, "Location is required"),
  region: z.string().min(1, "Region is required"),
  city: z.string().min(1, "City is required"),
  postalIndex: z.string()
    .min(1, "Postal index is required")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid postal index format"), // Example regex for a US postal code
  goods: z.string().min(1, "goods is required"),
  price: z.string().min(1, "price is required"),
  numberOfBedroom: z.string().min(1, "number of bedrooms is required"),
  description: z.string().min(1, "description is required"),
});
