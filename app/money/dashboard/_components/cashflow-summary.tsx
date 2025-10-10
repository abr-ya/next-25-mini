import numeral from "numeral";
import { IMonthlyCashflow } from "../../_interfaces/cashflow.interface";
import { cn } from "@/lib/utils";

interface ICashflowSummary {
  data: IMonthlyCashflow[];
}

export const CashflowSummary = ({ data }: ICashflowSummary) => {
  const totalIncome = data.reduce((acc: number, month) => acc + month.income, 0);
  const totalExpenses = data.reduce((acc: number, month) => acc + month.expenses, 0);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="border-l px-4 flex flex-col gap-4 justify-center">
      <div className="border-t" />
      <div>
        <span className="text-muted-foreground font-bold text-sm">Balance</span>
        <h2 className={cn("text-3xl font-bold", totalBalance >= 0 ? "text-lime-500" : "text-orange-500")}>
          {numeral(totalBalance).format("0,0[.]00")} usd
        </h2>
      </div>
    </div>
  );
};
