import { ITransactionDetail, ITransactionsListItem } from "../_interfaces/transaction.interface";
import { TransactionDataType, UpdateTransactionSchemaType } from "./transaction-form-schema";

export const normalizeTransactions = (databaseTransactions: ITransactionsListItem[]): TransactionDataType[] =>
  databaseTransactions.map((tx) => ({
    ...tx,
    transactionDate: new Date(tx.transactionDate).toISOString(),
    category: tx.category || "Uncategorized",
  }));

export const prepareTransactionForForm = (tx: ITransactionDetail): UpdateTransactionSchemaType => ({
  ...tx,
  transactionDate: new Date(tx.transactionDate),
  amount: Number(tx.amount),
  transactionType: tx.transactionType || "income", // todo: check if needed
});
