import type { Metadata } from "next";
import { Navbar } from "./_components";

export const metadata: Metadata = {
  title: "Money Tracker Project",
  description: "Next 15 + Tailwind + ShadcnUI",
};

const MoneyLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default MoneyLayout;
