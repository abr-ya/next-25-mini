export interface ICreateTransactionPayload {
  categoryId: number;
  amount: number;
  transactionDate: Date;
  description: string;
}

export interface IUpdateTransactionPayload extends ICreateTransactionPayload {
  id: number;
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

export interface ITransactionDetail {
  id: number;
  transactionType: "income" | "expense" | null;
  categoryId: number;
  amount: string;
  transactionDate: string;
  description: string;
  // createdAt: string;
  // updatedAt: string;
}
