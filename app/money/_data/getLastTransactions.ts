import "server-only";

import { neon } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export const getLastTransactions = async () => {
  const { userId } = await auth();

  if (!userId) return []; // add message?

  const transactions = await neon
    .select({
      id: transactionsTable.id,
      description: transactionsTable.description,
      amount: transactionsTable.amount,
      transactionDate: transactionsTable.transactionDate,
      category: categoriesTable.name,
      transactionType: categoriesTable.type,
    })
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, userId))
    .orderBy(desc(transactionsTable.transactionDate))
    .limit(5)
    .leftJoin(categoriesTable, eq(transactionsTable.categoryId, categoriesTable.id));

  return transactions;
};
