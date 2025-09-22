import { PageCard } from "@/app/money/_components/index";

const NewTransactionPage = () => {
  return (
    <PageCard
      title="New Transaction"
      breadcrumbs={[
        { to: "/money/dashboard", title: "Dashboard" },
        { to: "/money/dashboard/transactions", title: "Transactions" },
        { to: null, title: "New Transaction" },
      ]}
    >
      {/* <TransactionFormProvider /> */}
      todo: TransactionForm
    </PageCard>
  );
};

export default NewTransactionPage;
