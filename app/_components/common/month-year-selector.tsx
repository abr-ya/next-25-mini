"use client";

import { useState } from "react";
import { format } from "date-fns";

import { IPeriod } from "@/app/money/_interfaces/period.interface";

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components";
import { SimpleSelect } from "./simple-select";

interface IMonthYearSelector extends IPeriod {
  goHandler?: (period: IPeriod) => void;
  yearsRange: number[];
}

const MonthYearSelector = ({ month, year, goHandler, yearsRange }: IMonthYearSelector) => {
  const [selectedMonth, setSelectedMonth] = useState(month.toString());
  const [selectedYear, setSelectedYear] = useState(year.toString());
  const selectedDate = new Date(year, month - 1, 1);

  const handleGo = () => {
    if (goHandler) {
      goHandler({ month: Number(selectedMonth), year: Number(selectedYear) });
    } else {
      console.log("No goHandler provided");
    }
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
      <Button onClick={handleGo}>Go</Button>
    </div>
  );
};

export default MonthYearSelector;
