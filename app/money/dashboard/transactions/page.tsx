import { format } from "date-fns";
import { NotFound, PageCardWithTable, TransactionsTable } from "../../_components";
import { searchYearMonthSchema } from "../../_schemas/search-params-schema";
import { ButtonLink, MonthYearNavigator } from "@/app/_components/index";
import { PATH } from "../../_constants/path";
import { getTransactionsByMonth } from "../../_data/getTransactionsByMonth";
import { TransactionDataType } from "../../_schemas/transaction-form-schema";

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

  console.log({ transactions });

  const selectedDate = format(new Date(year, month - 1, 1), "MMM yyyy");

  const tempYearsRange = Array.from({ length: 4 }).map((_, i) => new Date().getFullYear() - i);

  const transactionsRender = (transactions: TransactionDataType[] | null) => {
    if (!transactions || transactions.length === 0) return <NotFound text="No transactions for this period" />;

    return <TransactionsTable data={transactions} />;
  };

  return (
    <PageCardWithTable
      title={`${selectedDate} Transactions`}
      headerRight={
        <div className="flex gap-4">
          <MonthYearNavigator path={PATH.transactions} month={month} year={year} yearsRange={tempYearsRange} />
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
