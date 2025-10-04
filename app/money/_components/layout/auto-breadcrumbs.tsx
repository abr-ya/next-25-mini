"use client";

import { Breadcrumbs, ICrumb } from "@/app/_components/layout/breadcrumbs";
import { usePathname } from "next/navigation";

export const AutoBreadcrumbs = () => {
  const pathname = usePathname();

  const parts = pathname?.split("/") || [];
  parts[0] = "Home";
  const breadcrumbs: ICrumb[] = [];

  parts.forEach((part, index) => {
    const to = "/" + parts.slice(1, index + 1).join("/");
    breadcrumbs.push({ title: part.charAt(0).toUpperCase() + part.slice(1), to });
  });

  breadcrumbs[breadcrumbs.length - 1].to = null; // last item is not a link

  return <Breadcrumbs data={breadcrumbs} />;
};
