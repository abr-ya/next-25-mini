import { and, eq } from "drizzle-orm";
import "server-only";

import { neon } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

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
