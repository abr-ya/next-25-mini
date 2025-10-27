"use client";

import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

import { usePathname } from "next/navigation";

export const AdminSidebar = () => {
  const path = usePathname();

  return (
    <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-2 text-gray-500">
      <Link
        href={"/linklist/account"}
        className={"flex gap-4 p-2 " + (path === "/linklist/account" ? "text-blue-500" : "")}
      >
        <LinkIcon size={24} />
        <span className="">My Page</span>
      </Link>
      <Link
        href={"/linklist/analytics"}
        className={"flex gap-4 p-2 " + (path === "/linklist/analytics" ? "text-blue-500" : "")}
      >
        <LinkIcon size={24} />
        <span className="">Analytics</span>
      </Link>
      <Link
        href={"/linklist/files"}
        className={"flex gap-4 p-2 " + (path === "/linklist/files" ? "text-blue-500" : "")}
      >
        <LinkIcon size={24} />
        <span className="">My Files</span>
      </Link>
      <Link href={"/linklist/"} className="flex items-center gap-2 text-xs text-gray-500 border-t pt-4">
        <LinkIcon size={24} />
        <span>Back to website</span>
      </Link>
    </nav>
  );
};
