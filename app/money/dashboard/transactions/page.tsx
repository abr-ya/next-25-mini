import { format } from "date-fns";

import { ButtonLink, MonthYearNavigator } from "@/app/_components/index";

import { NotFound, PageCardWithTable, TransactionsTable } from "@money/_components";
import { PATH } from "@money/_constants/path";
import { getTransactionsByMonth } from "@money/_data/getTransactionsByMonth";
import { getTransactionYearsRange } from "@money/_data/getTransactionYearsRange";
import { searchYearMonthSchema } from "@money/_schemas/search-params-schema";
import { TransactionDataType } from "@money/_schemas/transaction-form-schema";

interface ITransactionsPage {
  searchParams?: Promise<{
    month?: string;
    year?: string;
  }>;
}

const TransactionsPage = async ({ searchParams }: ITransactionsPage) => {
  const rawParams = await searchParams;
  const searchWithDefaults = searchYearMonthSchema.parse({
    month: rawParams?.month ? parseInt(rawParams.month) : undefined,
    year: rawParams?.year ? parseInt(rawParams.year) : undefined,
  });
  console.log(`TransactionsPage - searchWithDefaults: `, searchWithDefaults);

  const { year, month } = searchWithDefaults;

  const transactions = await getTransactionsByMonth({ month, year });
  const yearsRange = await getTransactionYearsRange();

  console.log(transactions, yearsRange);

  const selectedDate = format(new Date(year, month - 1, 1), "MMM yyyy");

  const transactionsRender = (transactions: TransactionDataType[] | null) => {
    if (!transactions || transactions.length === 0) return <NotFound text="No transactions for this period" />;

    return <TransactionsTable data={transactions} />;
  };

  return (
    <PageCardWithTable
      title={`${selectedDate} Transactions`}
      headerRight={
        <div className="flex gap-4">
          <MonthYearNavigator path={PATH.transactions} month={month} year={year} yearsRange={yearsRange} />
          <ButtonLink to={PATH.newTransaction} text="New Transaction" />
        </div>
      }
      breadcrumbs={[
        { to: PATH.dashboard, title: "Dashboard" },
        { to: null, title: "Transactions" },
      ]}
    >
      {transactionsRender(transactions)}
    </PageCardWithTable>
  );
};

export default TransactionsPage;
