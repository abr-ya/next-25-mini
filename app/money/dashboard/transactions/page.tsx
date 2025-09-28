import { PageCardWithTable } from "../../_components";
import { searchYearMonthSchema } from "../../_schemas/search-params-schema";

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

  return (
    <PageCardWithTable
      title="Transactions"
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
