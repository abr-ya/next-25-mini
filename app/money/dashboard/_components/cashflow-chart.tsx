"use client";

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import numeral from "numeral";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/index";
import { IMonthlyCashflow } from "@money/_interfaces/cashflow.interface";

interface ICashflowChart {
  data: IMonthlyCashflow[];
}

export const CashflowChart = ({ data }: ICashflowChart) => {
  const today = new Date();
  const chartConfig = {
    month: { label: "Month" },
    income: { label: "Income", color: "#84cc16" },
    expenses: { label: "Expenses", color: "#f97316" },
  };

  return (
    <ChartContainer config={chartConfig} className="w-full h-[300px]">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <YAxis tickFormatter={(value) => `${numeral(value).format("0.0")} usd`} />
        <XAxis tickFormatter={(value) => format(new Date(today.getFullYear(), value, 1), "MMM")} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_value, payload) => {
                const barMonth = payload[0]?.payload?.month - 1;
                const monthLabel = format(new Date(today.getFullYear(), barMonth, 1), "MMMM");

                return <div>{monthLabel}</div>;
              }}
            />
          }
          // todo: format + legend
          // formatter={(value: number, name: string) => `${name}: ${numeral(value).format("0.00")} usd`}
        />
        <Legend
          verticalAlign="top"
          align="right"
          height={30}
          iconType="star"
          formatter={(value) => <span className="capitalize text-primary">{value}</span>}
        />
        <Bar dataKey="income" radius={6} fill="var(--color-income)" />
        <Bar dataKey="expenses" radius={6} fill="var(--color-expenses)" />
      </BarChart>
    </ChartContainer>
  );
};
