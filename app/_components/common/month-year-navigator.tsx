"use client";

import { useState } from "react";
import { format } from "date-fns";

import { IPeriod } from "@/app/money/_interfaces/period.interface";

import { SimpleSelect } from "./simple-select";
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/index";

interface IMonthYearNavigator extends IPeriod {
  yearsRange: number[];
}

export const MonthYearNavigator = ({ month, year, yearsRange }: IMonthYearNavigator) => {
  const [selectedMonth, setSelectedMonth] = useState(month.toString());
  const [selectedYear, setSelectedYear] = useState(year.toString());
  const selectedDate = new Date(year, month - 1, 1);

  // todo: how to pass this props?
  const goHandler = () => {
    console.log("Go Handler: ", selectedMonth, selectedYear);
  };

  return (
    <div className="flex gap-1">
      <Select value={selectedMonth.toString()} onValueChange={(value: string) => setSelectedMonth(value)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }).map((_, i) => (
            <SelectItem key={i} value={`${i + 1}`}>
              {format(new Date(selectedDate.getFullYear(), i, 1), "MMM")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <SimpleSelect
        options={yearsRange.map((year) => ({ value: year.toString(), label: year.toString() }))}
        onSelect={setSelectedYear}
        value={selectedYear.toString()}
      />
      <Button onClick={goHandler}>Go</Button>
    </div>
  );
};
