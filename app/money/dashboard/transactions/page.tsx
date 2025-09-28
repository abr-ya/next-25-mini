import { format } from "date-fns";
import { PageCardWithTable } from "../../_components";
import { searchYearMonthSchema } from "../../_schemas/search-params-schema";
import { ButtonLink, MonthYearNavigator } from "@/app/_components/index";
import { PATH } from "../../_constants/path";

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
  const selectedDate = format(new Date(year, month - 1, 1), "MMM yyyy");

  const tempYearsRange = Array.from({ length: 4 }).map((_, i) => new Date().getFullYear() - i);

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
      Transactions
    </PageCardWithTable>
  );
};

export default TransactionsPage;
