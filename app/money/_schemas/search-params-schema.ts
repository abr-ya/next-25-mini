import { z } from "zod";

const today = new Date();

export const searchYearSchema = z.object({
  year: z
    .number()
    .min(today.getFullYear() - 100)
    .max(today.getFullYear())
    .catch(today.getFullYear()), // set current year if not provided or invalid
});

export const searchYearMonthSchema = searchYearSchema.extend({
  month: z
    .number()
    .min(1)
    .max(12)
    .catch(today.getMonth() + 1), // set current month if not provided or invalid
});
