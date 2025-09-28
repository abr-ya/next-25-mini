import { format } from "date-fns";
import { PageCardWithTable } from "../../_components";
import { searchYearMonthSchema } from "../../_schemas/search-params-schema";
import { ButtonLink, MonthYearNavigator } from "@/app/_components/index";

interface ITransactionsPage {
  searchParams?: Promise<{
    month?: string;
    year?: string;
  }>;
}

const TransactionsPage = async ({ searchParams }: ITransactionsPage) => {
  const resolvedSearchParams = await searchParams;
  console.log(`TransactionsPage - resolvedSearchParams: `, resolvedSearchParams);

  const searchWithDefaults = searchYearMonthSchema.parse(resolvedSearchParams);
  console.log(`TransactionsPage - searchWithDefaults: `, searchWithDefaults);

  const { year, month } = searchWithDefaults;
  const selectedDate = format(new Date(year, month - 1, 1), "MMM yyyy");

  const tempYearsRange = Array.from({ length: 4 }).map((_, i) => new Date().getFullYear() - i);

  return (
    <PageCardWithTable
      title={`${selectedDate} Transactions`}
      headerRight={
        <div className="flex gap-4">
          <MonthYearNavigator month={month} year={year} yearsRange={tempYearsRange} />
          <ButtonLink to="/dashboard/transactions/new" text="New Transaction" />
        </div>
      }
      breadcrumbs={[
        { to: "/money/dashboard", title: "Dashboard" },
        { to: null, title: "Transactions" },
      ]}
    >
      Transactions
    </PageCardWithTable>
  );
};

export default TransactionsPage;
