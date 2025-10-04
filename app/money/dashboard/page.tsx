import { PageCardWithTable } from "../_components";
import { getLastTransactions } from "../_data/getLastTransactions";
import { Cashflow, LastTransactions } from "./_components/index";

const DashboardPage = async () => {
  const lastTransactions = await getLastTransactions();

  return (
    <>
      <PageCardWithTable
        title="Cashflow"
        // todo: simpleSelect with Year for Cashflow
      >
        <Cashflow data={[]} />
      </PageCardWithTable>
      <LastTransactions transactions={lastTransactions} />
    </>
  );
};

export default DashboardPage;
