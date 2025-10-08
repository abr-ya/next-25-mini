import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { UserMenu } from "./user-menu";

export const Header = () => (
  <header className="bg-white border-b py-4">
    <div className="max-w-4xl flex justify-between mx-auto px-6">
      <div className="flex items-center gap-6">
        <Link href={"/"} className="flex items-center gap-2 text-blue-500">
          <LinkIcon size={24} />
          <span className="font-bold">LinkList</span>
        </Link>
        <nav className="flex items-center gap-4 text-slate-500 text-sm">
          <Link href={"/linklist/about"}>About</Link>
          <Link href={"/linklist/contact"}>Contact</Link>
        </nav>
      </div>
      <nav className="flex items-center gap-4 text-sm text-slate-500">
        <UserMenu />
      </nav>
    </div>
  </header>
);
