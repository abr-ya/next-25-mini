"use client";

import { PageCard, TransactionFormProvider } from "@/app/money/_components/index";
import { ICategory } from "@/app/money/_interfaces/category.interface";
import { TransactionSchemaType } from "@/app/money/_schemas/transaction-form-schema";

const tempCategories: ICategory[] = [
  {
    id: 1,
    name: "Salary",
    type: "income",
  },
  {
    id: 2,
    name: "Rental Income",
    type: "income",
  },
  {
    id: 3,
    name: "Business Income",
    type: "income",
  },
  {
    id: 6,
    name: "Housing",
    type: "expense",
  },
  {
    id: 7,
    name: "Transport",
    type: "expense",
  },
  {
    id: 8,
    name: "Food & Groceries",
    type: "expense",
  },
];

const NewTransactionPage = () => {
  const categories: ICategory[] = tempCategories; // fetch or pass categories as needed
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
