import { YearNavigator } from "@/app/_components/common/year-navigator";
import { PageCardWithTable } from "../_components";
import { getAnnualCashflow } from "../_data/getAnnualCashflow";
import { getLastTransactions } from "../_data/getLastTransactions";
import { Cashflow, LastTransactions } from "./_components/index";
import { getTransactionYearsRange } from "../_data/getTransactionYearsRange";
import { searchYearSchema } from "../_schemas/search-params-schema";

interface IDashboardPage {
  searchParams?: Promise<{
    year?: string;
  }>;
}

const DashboardPage = async ({ searchParams }: IDashboardPage) => {
  const rawParams = await searchParams;
  const { year } = searchYearSchema.parse({ year: rawParams?.year ? parseInt(rawParams.year) : undefined });

  const data = await Promise.all([getLastTransactions(), getAnnualCashflow(year), getTransactionYearsRange()]);
  const [lastTransactions, cashflowData, yearsRange] = data;

  return (
    <>
      <PageCardWithTable
        title="Cashflow"
        headerRight={<YearNavigator year={year} yearsRange={yearsRange} path="/money/dashboard" />}
      >
        <Cashflow data={cashflowData} />
      </PageCardWithTable>
      <LastTransactions transactions={lastTransactions} />
    </>
  );
};

export default DashboardPage;
