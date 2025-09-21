import { Breadcrumbs, ICrumb } from "@/app/_components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/index";
import { PropsWithChildren } from "react";

interface IPageCard {
  breadcrumbs?: ICrumb[];
  title: string;
}

export const PageCard = ({ breadcrumbs, children, title }: PropsWithChildren<IPageCard>) => (
  <div className="max-w-screen-xl mx-auto py-10">
    {breadcrumbs ? <Breadcrumbs data={breadcrumbs} /> : null}
    <Card className="mt-4 max-w-screen-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  </div>
);
