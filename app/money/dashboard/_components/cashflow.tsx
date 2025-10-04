import { IMonthlyCashflow } from "@money/_interfaces/cashflow.interface";
import { CashflowChart } from "./cashflow-chart";
import { CashflowSummary } from "./cashflow-summary";

interface ICashflow {
  data: IMonthlyCashflow[];
}

export const Cashflow = ({ data }: ICashflow) => (
  <div className="flex gap-4">
    <CashflowChart data={data} />
    <CashflowSummary />
  </div>
);
