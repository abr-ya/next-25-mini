import "server-only";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { format } from "date-fns";

import { neon } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { IPeriod } from "../_interfaces/period.interface";

export const getTransactionsByMonth = async ({ month, year }: IPeriod) => {
  const { userId } = await auth();

  if (!userId) return null;

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

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
    .where(
      and(
        eq(transactionsTable.userId, userId),
        gte(transactionsTable.transactionDate, format(startDate, "yyyy-MM-dd")),
        lte(transactionsTable.transactionDate, format(endDate, "yyyy-MM-dd")),
      ),
    )
    .orderBy(desc(transactionsTable.transactionDate))
    .leftJoin(categoriesTable, eq(transactionsTable.categoryId, categoriesTable.id));

  return transactions;
};
