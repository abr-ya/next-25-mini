import { NotFound, PageCardWithTable } from "@money/_components/index";
import { ButtonLink } from "@/app/_components/index";
import { TransactionDataType } from "@money/_schemas/transaction-form-schema";
import { PATH } from "@money/_constants/path";

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
    {transactions.length === 0 ? <NotFound text="No transactions found" /> : <div>ToDo: TransactionsTable</div>}
  </PageCardWithTable>
);
