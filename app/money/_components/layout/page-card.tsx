import { Card, CardContent, CardHeader, CardTitle } from "@/components/index";
import { PropsWithChildren, ReactNode } from "react";

interface IPageCard {
  title: string;
}

interface IPageCardWithTable extends IPageCard {
  headerRight?: ReactNode;
}

export const PageCard = ({ children, title }: PropsWithChildren<IPageCard>) => (
  <Card className="mt-4 max-w-screen-md">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

// todo: mb one component with a prop "headerRight"?
export const PageCardWithTable = ({ title, children, headerRight }: PropsWithChildren<IPageCardWithTable>) => (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle className="flex justify-between items-baseline">
        <div>{title}</div>
        {headerRight ? headerRight : null}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
