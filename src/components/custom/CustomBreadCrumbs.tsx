import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface Props {
  currentPage: string;
  breadCrumbs?: BreadCrumb[];
}

interface BreadCrumb {
  label: string;
  to: string;
}

export const CustomBreadCrumbs = ({ currentPage, breadCrumbs = [] }: Props) => {
  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadCrumbs.map((item) => (
          <div className="flex items-center justify-center">
            <BreadcrumbSeparator className="mr-2">/</BreadcrumbSeparator>
            <BreadcrumbItem key={item.label}>
              <BreadcrumbLink>
                <Link to={item.to}>{item.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}

        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink className="text-black font-bold">
            {currentPage}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
