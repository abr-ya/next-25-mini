"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  TransactionSchemaType,
  UpdateTransactionSchemaType,
  transactionDefaultValues as defaultValues,
  transactionFormSchema,
} from "@money/_schemas/transaction-form-schema";
import { TransactionForm } from "./transaction-form";
import { TEST_MODE } from "./transaction-form-constants";
import { Form } from "@/components/index";
import { ICategory } from "@money/_interfaces/category.interface";
import { createTransaction, updateTransaction } from "@money/_data/crudTransaction";

interface ITransactionFormProvider {
  categories: ICategory[];
  init?: UpdateTransactionSchemaType | null;
  isNew?: boolean;
}

export const TransactionFormProvider = ({ init, isNew, ...props }: ITransactionFormProvider) => {
  const router = useRouter();
  const formMethods = useForm<TransactionSchemaType>({
    defaultValues: init || defaultValues,
    mode: "all",
    // @ts-expect-error todo: fix it!!!
    resolver: zodResolver(transactionFormSchema),
  });

  const createHandler = async (data: TransactionSchemaType) => {
    console.log("Create Handler: ", data);
    const newTransactionOrError = await createTransaction(data);
    console.log("New Transaction (or Error): ", newTransactionOrError);
    if (!newTransactionOrError || "error" in newTransactionOrError) {
      console.log("Error creating transaction: ", newTransactionOrError);
      toast.error(`Something went wrong: ${newTransactionOrError?.message}. Please try again.`, {
        style: {
          background: "maroon",
          color: "white",
        },
      });
    } else {
      toast.success(`Transaction ${newTransactionOrError.id} (${newTransactionOrError.amount}) has been created.`);

      // todo: ==> utils?
      const month = data.transactionDate.getMonth() + 1;
      const year = data.transactionDate.getFullYear();
      // redirect to transactions list with month & year query params
      router.push(`/money/dashboard/transactions?month=${month}&year=${year}`);
    }
  };

  const editHandler = async (data: TransactionSchemaType) => {
    if (!init || !init.id) {
      toast.error("No transaction ID provided. Can't update.");
      return;
    }
    const id = init?.id;
    console.log("Edit Handler: ", data);
    const updatedTransactionOrError = await updateTransaction({ ...data, id });
    if (!updatedTransactionOrError || "error" in updatedTransactionOrError) {
      console.log("Error updating transaction: ", updatedTransactionOrError);
      toast.error(`Something went wrong: ${updatedTransactionOrError?.message}. Please try again.`, {
        style: {
          background: "maroon",
          color: "white",
        },
      });
    } else {
      toast.success(
        `Transaction ${updatedTransactionOrError.id} (${updatedTransactionOrError.amount}) has been updated.`,
      );

      // todo: ==> utils?
      const month = data.transactionDate.getMonth() + 1;
      const year = data.transactionDate.getFullYear();
      // redirect to transactions list with month & year query params
      router.push(`/money/dashboard/transactions?month=${month}&year=${year}`);
    }
  };

  return (
    <Form {...formMethods}>
      <TransactionForm {...props} onSubmit={isNew ? createHandler : editHandler} />
      {/* @ts-expect-error todo: fix it!!! */}
      {TEST_MODE ? <DevTool control={formMethods.control} /> : null}
    </Form>
  );
};
