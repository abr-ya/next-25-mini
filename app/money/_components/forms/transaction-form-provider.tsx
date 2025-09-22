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
import { TEST_MODE } from "./transaction-form-contants";
import { Form } from "@/components/index";

// @ts-expect-error todo: props!
export const TransactionFormProvider = (props) => {
  const formMethods = useForm<TransactionSchemaType>({
    defaultValues: props.init || defaultValues,
    mode: "all",
    // @ts-expect-error todo: fix it!!!
    resolver: zodResolver(transactionFormSchema),
  });

  return (
    <Form {...formMethods}>
      <TransactionForm {...props} />
      {/* @ts-expect-error todo: fix it!!! */}
      {TEST_MODE ? <DevTool control={formMethods.control} /> : null}
    </Form>
  );
};
