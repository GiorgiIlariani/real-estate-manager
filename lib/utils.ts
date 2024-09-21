import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const url = "https://api.real-estate-manager.redberryinternship.ge/api"; 

export const validatePrice = (min: number | null, max: number | null) => {
  // Allow both to be null without errors
  if (min === null && max === null) {
    return null; // No validation error if both are empty
  }

  // Check for negative values
  if (min !== null && min < 0) {
    return "Prices cannot be negative.";
  }
  if (max !== null && max < 0) {
    return "Prices cannot be negative.";
  }

  // Ensure min is not greater than max
  if (min !== null && max !== null && min > max) {
    return "Minimum price cannot be greater than maximum price.";
  }

  return null;
};


export const validateArea = (min: number | null, max: number | null) => {
  // Allow both to be null without errors
  if (min === null && max === null) {
    return null; // No validation error if both are empty
  }

  // Check for negative values
  if (min !== null && min < 0) {
    return "Areas cannot be negative.";
  }
  if (max !== null && max < 0) {
    return "Areas cannot be negative.";
  }

  // Ensure min is not greater than max
  if (min !== null && max !== null && min > max) {
    return "Minimum area cannot be greater than maximum area.";
  }

  return null;
};


export const base64ToBlob = (base64: string, mimeType: string = "image/jpeg") => {
  const byteCharacters = atob(base64.split(',')[1]); // Get the base64 content after the comma
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};
