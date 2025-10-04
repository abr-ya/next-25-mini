import "server-only";
import { neon } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, sql, sum } from "drizzle-orm";

export const getAnnualCashflow = async (year: number) => {
  const { userId } = await auth();

  if (!userId) return []; // todo: add message?

  const month = sql`EXTRACT(MONTH FROM ${transactionsTable.transactionDate})`;

  const cashflow = await neon
    .select({
      month,
      income: sum(sql`CASE WHEN ${categoriesTable.type} = 'income' THEN ${transactionsTable.amount} ELSE 0 END`),
      expenses: sum(sql`CASE WHEN ${categoriesTable.type} = 'expense' THEN ${transactionsTable.amount} ELSE 0 END`),
    })
    .from(transactionsTable)
    .leftJoin(categoriesTable, eq(transactionsTable.categoryId, categoriesTable.id))
    .where(
      and(eq(transactionsTable.userId, userId), sql`EXTRACT(YEAR FROM ${transactionsTable.transactionDate}) = ${year}`),
    )
    .groupBy(month);

  const annualCashflow: {
    month: number;
    income: number;
    expenses: number;
  }[] = [];

  for (let i = 1; i <= 12; i++) {
    const monthlyCashflow = cashflow.find((cf) => Number(cf.month) === i);
    annualCashflow.push({
      month: i,
      income: Number(monthlyCashflow?.income ?? 0),
      expenses: Number(monthlyCashflow?.expenses ?? 0),
    });
  }

  return annualCashflow;
};
