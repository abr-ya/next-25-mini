import type { Metadata } from "next";
import { AutoBreadcrumbs, Header } from "./_components";
import { Footer } from "../_components";

export const metadata: Metadata = {
  title: "Money Tracker Project",
  description: "Next 15 + Tailwind + ShadcnUI",
};

const MoneyLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className="flex-1 h-[calc(100vh-100px)]">
      <div className="max-w-screen-xl mx-auto py-5 px-4">
        <AutoBreadcrumbs />
        {children}
      </div>
    </main>
    <Footer />
  </>
);

export default MoneyLayout;
