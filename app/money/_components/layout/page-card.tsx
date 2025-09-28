import { Breadcrumbs, ICrumb } from "@/app/_components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/index";
import { PropsWithChildren, ReactNode } from "react";

interface IPageCard {
  breadcrumbs?: ICrumb[];
  title: string;
}

interface IPageCardWithTable extends IPageCard {
  headerRight?: ReactNode;
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

// todo: mb one component with a prop "headerRight"?
export const PageCardWithTable = ({
  title,
  children,
  breadcrumbs,
  headerRight,
}: PropsWithChildren<IPageCardWithTable>) => (
  <div className="max-w-screen-xl mx-auto py-10">
    {breadcrumbs ? <Breadcrumbs data={breadcrumbs} /> : null}
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-baseline">
          <div>{title}</div>
          {headerRight ? headerRight : null}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  </div>
);
