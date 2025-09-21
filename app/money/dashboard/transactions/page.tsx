import { PageCard } from "../../_components";

const TransactionsPage = () => {
  return (
    <PageCard
      title="Transactions"
      breadcrumbs={[
        { to: "/money/dashboard", title: "Dashboard" },
        { to: null, title: "Transactions" },
      ]}
    >
      Transactions
    </PageCard>
  );
};

export default TransactionsPage;
