"use client";

import { PageCard, TransactionFormProvider } from "@/app/money/_components/index";
import { TransactionSchemaType } from "@/app/money/_schemas/transaction-form-schema";

const NewTransactionPage = () => {
  const categories: string[] = []; // fetch or pass categories as needed
  const createHandler = async (data: TransactionSchemaType) => {
    console.log("HANDLE SUBMIT: ", data);
    // create transaction
    // toast
    // redirect
  };

  return (
    <PageCard
      title="New Transaction"
      breadcrumbs={[
        { to: "/money/dashboard", title: "Dashboard" },
        { to: "/money/dashboard/transactions", title: "Transactions" },
        { to: null, title: "New Transaction" },
      ]}
    >
      <TransactionFormProvider categories={categories} onSubmit={createHandler} />
    </PageCard>
  );
};

export default NewTransactionPage;
