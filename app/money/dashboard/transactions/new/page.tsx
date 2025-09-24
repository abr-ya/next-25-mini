import { PageCard, TransactionFormProvider } from "@/app/money/_components/index";
import { getCategories } from "@/app/money/_data/getCategories";

const NewTransactionPage = async () => {
  const categories = await getCategories();

  return (
    <PageCard
      title="New Transaction"
      breadcrumbs={[
        { to: "/money/dashboard", title: "Dashboard" },
        { to: "/money/dashboard/transactions", title: "Transactions" },
        { to: null, title: "New Transaction" },
      ]}
    >
      <TransactionFormProvider categories={categories} isNew />
    </PageCard>
  );
};

export default NewTransactionPage;
