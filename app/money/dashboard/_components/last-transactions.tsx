import { PageCardWithTable } from "../../_components/index";
import { ButtonLink } from "@/app/_components/index";
import { TransactionDataType } from "../../_schemas/transaction-form-schema";
import { PATH } from "../../_constants/path";

interface ILastTransactions {
  transactions: TransactionDataType[];
}

export const LastTransactions = ({ transactions }: ILastTransactions) => (
  <PageCardWithTable
    title="Last Transactions"
    headerRight={
      <div className="flex gap-4">
        <ButtonLink to={PATH.transactions} text="View All" variant="outline" />
        <ButtonLink to={PATH.newTransaction} text="New Transaction" />
      </div>
    }
  >
    {transactions.length === 0 ? (
      <p className="text-center py-10 text-lg text-muted-foreground">No transactions found.</p>
    ) : (
      <div>ToDo: TransactionsTable</div>
    )}
  </PageCardWithTable>
);
