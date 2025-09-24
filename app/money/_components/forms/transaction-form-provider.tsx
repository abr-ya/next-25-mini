"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

import {
  TransactionSchemaType,
  transactionDefaultValues as defaultValues,
  transactionFormSchema,
} from "../../_schemas/transaction-form-schema";
import { TransactionForm } from "./transaction-form";
import { TEST_MODE } from "./transaction-form-constants";
import { Form } from "@/components/index";
import { ICategory } from "../../_interfaces/category.interface";
import { createTransaction } from "../../_data/createTransaction";

interface ITransactionFormProvider {
  categories: ICategory[];
  init?: Partial<TransactionSchemaType>;
  isNew?: boolean;
}

export const TransactionFormProvider = ({ init, isNew, ...props }: ITransactionFormProvider) => {
  const formMethods = useForm<TransactionSchemaType>({
    defaultValues: init || defaultValues,
    mode: "all",
    // @ts-expect-error todo: fix it!!!
    resolver: zodResolver(transactionFormSchema),
  });

  const createHandler = async (data: TransactionSchemaType) => {
    console.log("Create Handler: ", data);
    const newTransaction = await createTransaction(data);
    console.log("New Transaction: ", newTransaction);
    // toast
    // redirect
  };

  const editHandler = async (data: TransactionSchemaType) => {
    console.log("Edit Handler: ", data);
    // edit transaction
    // toast
    // redirect
  };

  return (
    <Form {...formMethods}>
      <TransactionForm {...props} onSubmit={isNew ? createHandler : editHandler} />
      {/* @ts-expect-error todo: fix it!!! */}
      {TEST_MODE ? <DevTool control={formMethods.control} /> : null}
    </Form>
  );
};
