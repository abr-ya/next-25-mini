"use server";

import { neon } from "@/db";
import { transactionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { ICreateTransactionPayload } from "../_interfaces/transaction.interface";

export const createTransaction = async (data: ICreateTransactionPayload) => {
  const { userId } = await auth();

  if (!userId) return { error: true, message: "Unauthorized" };

  const [transaction] = await neon
    .insert(transactionsTable)
    .values({
      userId,
      amount: data.amount.toString(),
      description: data.description,
      categoryId: data.categoryId,
      transactionDate: data.transactionDate.toISOString(),
    })
    .returning();

  return transaction;
};
