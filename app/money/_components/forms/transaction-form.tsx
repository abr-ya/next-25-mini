import { SubmitErrorHandler, SubmitHandler, useFormContext } from "react-hook-form";

import { LABELS, TEST_MODE, TYPES } from "./transaction-form-contants";
import { RHFDatePicker, RHFInput, RHFSelect } from "./fields";

import { TransactionSchemaType } from "../../_schemas/transaction-form-schema";
import { Button } from "@/components/index";
import { ICategory } from "../../_interfaces/category.interface";

interface ITransactionForm {
  categories: ICategory[];
  onSubmit: (data: TransactionSchemaType) => void;
}

export const TransactionForm = ({ categories, onSubmit }: ITransactionForm) => {
  const { formState, handleSubmit, reset, watch } = useFormContext<TransactionSchemaType>();

  const submitHandler: SubmitHandler<TransactionSchemaType> = (data) => {
    const preparedData = data;
    if (TEST_MODE) {
      console.log("preparedData", preparedData);
    } else {
      onSubmit(preparedData);
    }
    reset();
  };

  const errorHandler: SubmitErrorHandler<TransactionSchemaType> = (errors) => {
    if (TEST_MODE) console.log("errors", errors);
  };

  const currentType = watch("transactionType");
  const isExpense = currentType === "expense";

  const expenseCategories = categories
    .filter((cat) => cat.type === "expense")
    .map(({ name, id }) => ({ label: name, value: id.toString() }));
  const incomeCategories = categories
    .filter((cat) => cat.type === "income")
    .map(({ name, id }) => ({ label: name, value: id.toString() }));

  return (
    <form onSubmit={handleSubmit(submitHandler, errorHandler)}>
      <fieldset disabled={formState.isSubmitting} className="grid grid-cols-2 gap-y-5 gap-x-2">
        <RHFSelect<TransactionSchemaType> label={LABELS.type} name="transactionType" options={TYPES} />
        {isExpense ? (
          <RHFSelect<TransactionSchemaType> label={LABELS.category} name="categoryId" options={expenseCategories} />
        ) : (
          <RHFSelect<TransactionSchemaType> label={LABELS.category} name="categoryId" options={incomeCategories} />
        )}
        <RHFInput<TransactionSchemaType> label={LABELS.amount} name="amount" type="number" />
        <RHFDatePicker<TransactionSchemaType> label={LABELS.date} name="transactionDate" />
      </fieldset>
      <fieldset disabled={formState.isSubmitting} className="flex flex-col gap-5 mt-5">
        <RHFInput<TransactionSchemaType> label={LABELS.description} name="description" />
        <Button type="submit">{formState.isSubmitting ? "Submitting..." : "Submit"}</Button>
      </fieldset>
    </form>
  );
};
