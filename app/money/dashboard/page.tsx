import { PageCardWithTable } from "../_components";
import { Cashflow, LastTransactions } from "./_components/index";

const DashboardPage = () => {
  return (
    <>
      <PageCardWithTable
        title="Cashflow"
        // todo: simpleSelect with Year for Cashflow
      >
        <Cashflow data={[]} />
      </PageCardWithTable>
      <LastTransactions transactions={[]} />
    </>
  );
};

export default DashboardPage;
