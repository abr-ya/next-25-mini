"use server";

import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";

import { neon } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { ICreateTransactionPayload, IUpdateTransactionPayload } from "../_interfaces/transaction.interface";
import { updateTransactionSchema } from "../_schemas/transaction-form-schema";

export const createTransaction = async (data: ICreateTransactionPayload) => {
  const { userId } = await auth();

  // todo: messages should be handled in a better way
  if (!userId) return { error: true, message: "Unauthorized" };

  try {
    const [transaction] = await neon
      .insert(transactionsTable)
      .values({
        userId,
        amount: data.amount.toString(),
        description: data.description,
        categoryId: data.categoryId,
        transactionDate: format(data.transactionDate, "P"),
      })
      .returning();

    return transaction;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("Error creating transaction (action): ", error);

    return { error: true, message: error.detail || error.message || "Action error" };
  }
};

export const getTransaction = async (transactionId: number) => {
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
};

export const updateTransaction = async (data: IUpdateTransactionPayload) => {
  const { userId } = await auth();

  // todo: messages should be handled in a better way
  if (!userId) return { error: true, message: "Unauthorized" };

  const validation = updateTransactionSchema.safeParse(data);

  if (!validation.success) return { error: true, message: validation.error.issues[0].message };

  if (!data.id) return { error: true, message: "Transaction ID is required" };

  const [transaction] = await neon
    .update(transactionsTable)
    .set({
      description: data.description,
      amount: data.amount.toString(),
      transactionDate: format(data.transactionDate, "P"),
      categoryId: data.categoryId,
    })
    .where(and(eq(transactionsTable.id, data.id), eq(transactionsTable.userId, userId)))
    .returning();

  return transaction;
};

export async function deleteTransaction(transactionId: number) {
  const { userId } = await auth();

  if (transactionId <= 25)
    return { error: true, message: "You can't delete transactions with ID less than or equal to 25" };

  // todo: messages should be handled in a better way
  if (!userId) return { error: true, message: "Unauthorized" };

  const res = await neon
    .delete(transactionsTable)
    .where(and(eq(transactionsTable.id, transactionId), eq(transactionsTable.userId, userId)));

  console.log("Delete result:", res);

  return { error: false, message: `Transaction ${transactionId} deleted` };
}
