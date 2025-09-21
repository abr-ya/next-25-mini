import { Fragment } from "react/jsx-runtime";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface ICrumb {
  title: string;
  to: string | null;
}

interface IBreadcrumbs {
  data: ICrumb[];
}

export const Breadcrumbs = ({ data }: IBreadcrumbs) => (
  <Breadcrumb>
    <BreadcrumbList>
      {data.map((el) => (
        <Fragment key={el.title}>
          <BreadcrumbItem>
            {el.to ? (
              <BreadcrumbLink asChild>
                <Link href={el.to}>{el.title}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{el.title}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {el.to ? <BreadcrumbSeparator /> : null}
        </Fragment>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
);
