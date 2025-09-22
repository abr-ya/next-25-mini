import { z } from "zod";
import { addDays } from "date-fns";

// todo: mb i dont need z.coerce?!
export const transactionFormSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  categoryId: z.coerce.number().positive("Please select a category"),
  transactionDate: z.date().max(addDays(new Date(), 1), "Transaction date cannot be in the future"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 characters")
    .max(300, "Description must contain a maximum of 300 characters"),
});

export const updateTransactionSchema = transactionFormSchema.extend({
  id: z.number(),
});

export type TransactionSchemaType = z.infer<typeof transactionFormSchema>;
export type UpdateTransactionSchemaType = z.infer<typeof updateTransactionSchema>;

export type TransactionDataType = Omit<TransactionSchemaType, "categoryId" | "amount" | "transactionType"> & {
  id: number;
  amount: string; // because from db it's coming as string
  category: string;
  transactionType: "income" | "expense" | null; // because of left join
  createdAt?: Date;
  updatedAt?: Date;
};

export const transactionDefaultValues: TransactionSchemaType = {
  transactionType: "income",
  amount: 0,
  categoryId: 0,
  description: "",
  transactionDate: new Date(),
};
