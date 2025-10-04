import { PageCardWithTable } from "../_components";
import { getAnnualCashflow } from "../_data/getAnnualCashflow";
import { getLastTransactions } from "../_data/getLastTransactions";
import { Cashflow, LastTransactions } from "./_components/index";

const DashboardPage = async () => {
  const lastTransactions = await getLastTransactions();
  const cashflowData = await getAnnualCashflow(new Date().getFullYear());

  return (
    <>
      <PageCardWithTable
        title="Cashflow"
        // todo: simpleSelect with Year for Cashflow
      >
        <Cashflow data={cashflowData} />
      </PageCardWithTable>
      <LastTransactions transactions={lastTransactions} />
    </>
  );
};

export default DashboardPage;
