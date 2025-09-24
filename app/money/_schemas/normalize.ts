import { ITransactionsListItem } from "../_interfaces/transaction.interface";
import { TransactionDataType } from "./transaction-form-schema";

export const normalizeTransactions = (databaseTransactions: ITransactionsListItem[]): TransactionDataType[] =>
  databaseTransactions.map((tx) => ({
    ...tx,
    transactionDate: new Date(tx.transactionDate),
    category: tx.category || "Uncategorized",
  }));
