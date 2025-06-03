import { BreadcrumbItem } from "@/hooks/use-breadcrumbs/use-breadcrumbs";
import { Link } from "react-router-dom";

interface BreadcrumbsItemProps {
  breadcrumb: BreadcrumbItem;
}

function BreadcrumbsItem({ breadcrumb }: BreadcrumbsItemProps) {
  const { pathname, title, isLast } = breadcrumb;

  return (
    <span key={pathname} className="inline-flex items-center">
      {isLast ? (
        <span className="text-sm text-gray-800 font-medium">{title}</span>
      ) : (
        <>
          <Link
            to={pathname}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            {title}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
        </>
      )}
    </span>
  );
}

export default BreadcrumbsItem;
