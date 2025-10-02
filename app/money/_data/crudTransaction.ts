"use server";

import { neon } from "@/db";

import { categoriesTable, transactionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { ICreateTransactionPayload, IUpdateTransactionPayload } from "../_interfaces/transaction.interface";
import { and, eq } from "drizzle-orm";
import { updateTransactionSchema } from "../_schemas/transaction-form-schema";

export const createTransaction = async (data: ICreateTransactionPayload) => {
  const { userId } = await auth();

  if (!userId) return { error: true, message: "Unauthorized" };

  try {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("Error creating transaction (action): ", error);

    return { error: true, message: error.detail || error.message || "Action error" };
  }
};

export async function getTransaction(transactionId: number) {
  const { userId } = await auth();

  if (!userId) return null;

  const [transaction] = await neon
    .select({
      id: transactionsTable.id,
      transactionType: categoriesTable.type,
      categoryId: transactionsTable.categoryId,
      amount: transactionsTable.amount,
      transactionDate: transactionsTable.transactionDate,
      description: transactionsTable.description,
    })
    .from(transactionsTable)
    .where(and(eq(transactionsTable.id, transactionId), eq(transactionsTable.userId, userId)))
    .leftJoin(categoriesTable, eq(transactionsTable.categoryId, categoriesTable.id));

  return transaction;
}

export const updateTransaction = async (data: IUpdateTransactionPayload) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = updateTransactionSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message,
    };
  }

  const [transaction] = await neon
    .update(transactionsTable)
    .set({
      description: data.description,
      amount: data.amount.toString(),
      transactionDate: data.transactionDate.toISOString(),
      categoryId: data.categoryId,
    })
    .where(and(eq(transactionsTable.id, data.id), eq(transactionsTable.userId, userId)))
    .returning();

  return transaction;
};
