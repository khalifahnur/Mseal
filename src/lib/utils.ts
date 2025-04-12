import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return new Date(dateString).toLocaleDateString("en-US", options)
}

export function maskExceptLastFour(value: string | null | undefined): string {
  if (value === null || value === undefined) return "*";
  if (value.length <= 4) return value;
  const lastFour = value.slice(-4);
  const maskedPart = "*".repeat(value.length - 4);
  return maskedPart + lastFour;
}

