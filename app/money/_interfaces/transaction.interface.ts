export interface ICreateTransactionPayload {
  categoryId: number;
  amount: number;
  transactionDate: Date;
  description: string;
}

// this interface from select: getTransactionsByMonth, getLastTransactions, but they can be changed
export interface ITransactionsListItem {
  id: number;
  description: string;
  amount: string;
  transactionDate: string;
  category: string | null;
  transactionType: "income" | "expense" | null;
}
