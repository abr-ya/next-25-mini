import { notFound } from "next/navigation";

import { PageCard, TransactionFormProvider } from "@money/_components";
import { getCategories } from "@money/_data/getCategories";
import { getTransaction } from "@money/_data/crudTransaction";
import { prepareTransactionForForm } from "@money/_schemas/normalize";

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
  const currentValues = await getTransaction(id);
  console.log(categories, currentValues);

  const init = currentValues ? prepareTransactionForForm(currentValues) : null;
  console.log("Init values for form: ", init);

  return (
    <PageCard
      title="EditTransactionPage"
      breadcrumbs={[
        { to: "/money/dashboard", title: "Dashboard" },
        { to: "/money/dashboard/transactions", title: "Transactions" },
        { to: null, title: "Edit Transaction" },
      ]}
    >
      {currentValues ? (
        <TransactionFormProvider categories={categories} init={init} />
      ) : (
        <>Can't get current transaction</>
      )}
    </PageCard>
  );
};

export default EditTransactionPage;
