import { PageCardWithTable } from "../_components";
import { Cashflow, LastTransactions } from "./_components/index";

const DashboardPage = () => {
  return (
    <>
      <PageCardWithTable
        title="Cashflow"
        // todo: simpleSelect with Year for Cashflow
        breadcrumbs={[{ to: null, title: "Dashboard" }]}
      >
        <Cashflow data={[]} />
      </PageCardWithTable>
      <LastTransactions transactions={[]} />
    </>
  );
};

export default DashboardPage;
