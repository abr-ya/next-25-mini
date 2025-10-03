import { IMonthlyCashflow } from "../../_interfaces/cashflow.interface";

interface ICashflow {
  data: IMonthlyCashflow[];
}

export const Cashflow = ({ data }: ICashflow) => (
  <ul>
    {data.map((item) => (
      <li key={item.month}>
        Month: {item.month}, Income: {item.income}, Expenses: {item.expenses}
      </li>
    ))}
  </ul>
);
