import type { Metadata } from "next";
import { Header } from "./_components";
import { Footer } from "../_components";

export const metadata: Metadata = {
  title: "Money Tracker Project",
  description: "Next 15 + Tailwind + ShadcnUI",
};

const MoneyLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className="flex-1 h-[calc(100vh-100px)]">{children}</main>
    <Footer />
  </>
);

export default MoneyLayout;
