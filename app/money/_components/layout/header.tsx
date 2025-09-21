import { Button } from "@/components/index";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ChartColumnBigIcon, CalendarSearchIcon } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "./user-menu";

export const Header = () => (
  <header>
    <nav className="bg-primary p-4 text-white h-[70px] flex items-center justify-between">
      <div className="flex gap-4">
        <Link href="/" className="font-bond text-2xl flex gap-1 items-center">
          <CalendarSearchIcon className="text-blue-500" /> Home
        </Link>
        <Link href="/money" className="font-bold text-2xl flex gap-1 items-center">
          <ChartColumnBigIcon className="text-lime-500" /> NextMoney
        </Link>
      </div>
      <div>
        <SignedOut>
          <div className="flex items-center">
            <Button asChild variant="link" className="text-white">
              <SignInButton />
            </Button>
            <Button asChild variant="link" className="text-white">
              <SignUpButton />
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  </header>
);
