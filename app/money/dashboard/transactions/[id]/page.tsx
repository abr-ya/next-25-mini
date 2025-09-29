import { PageCard } from "@money/_components";

interface IEditTransactionPage {
  params: Promise<{
    id: string;
  }>;
}

const EditTransactionPage = async ({ params }: IEditTransactionPage) => {
  const paramsValues = await params;
  const id = Number(paramsValues.id);

  // todo: update breadcrumbs!
  return (
    <PageCard
      title="EditTransactionPage"
      breadcrumbs={[
        { to: "/money/dashboard", title: "Dashboard" },
        { to: "/money/dashboard/transactions", title: "Transactions" },
        { to: null, title: "Edit Transaction" },
      ]}
    >
      EditTransactionPage {id}
    </PageCard>
  );
};

export default EditTransactionPage;
