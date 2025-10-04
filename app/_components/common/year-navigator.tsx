"use client";

import { useRouter } from "next/navigation";

import { SimpleSelect } from "./simple-select";

interface IYearNavigator {
  path: string;
  year: number;
  yearsRange: number[];
}

export const YearNavigator = ({ year, yearsRange, path }: IYearNavigator) => {
  const router = useRouter();

  const goHandler = (year: string) => {
    router.push(`${path}?year=${year}`);
  };

  return (
    <SimpleSelect
      options={yearsRange.map((year) => ({ value: year.toString(), label: year.toString() }))}
      onSelect={goHandler}
      value={year.toString()}
    />
  );
};
