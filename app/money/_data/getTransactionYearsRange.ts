import { neon } from "@/db";
import { transactionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { asc, eq } from "drizzle-orm";
import "server-only";

export async function getTransactionYearsRange() {
  const { userId } = await auth();
  if (!userId) return [];

  const [earliestTransaction] = await neon
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, userId))
    .orderBy(asc(transactionsTable.transactionDate))
    .limit(1);

  const currentYear = new Date().getFullYear();
  const earliestYear = earliestTransaction ? new Date(earliestTransaction.transactionDate).getFullYear() : currentYear;

  const years = Array.from({ length: currentYear - earliestYear + 1 }).map((_, i) => currentYear - i);

  return years;
}
