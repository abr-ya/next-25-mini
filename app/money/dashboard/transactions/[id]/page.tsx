import { notFound } from "next/navigation";

import { PageCard, TransactionFormProvider } from "@money/_components";
import { getCategories } from "@money/_data/getCategories";

interface IEditTransactionPage {
  params: Promise<{
    id: string;
  }>;
}

const EditTransactionPage = async ({ params }: IEditTransactionPage) => {
  const paramsValues = await params;
  const id = Number(paramsValues.id);

  if (isNaN(id)) notFound();

  const categories = await getCategories();
  console.log(categories);

  // todo: get transaction data (delete isNew)

  return (
    <PageCard
      title="EditTransactionPage"
      breadcrumbs={[
        { to: "/money/dashboard", title: "Dashboard" },
        { to: "/money/dashboard/transactions", title: "Transactions" },
        { to: null, title: "Edit Transaction" },
      ]}
    >
      <TransactionFormProvider categories={categories} isNew />
    </PageCard>
  );
};

export default EditTransactionPage;
