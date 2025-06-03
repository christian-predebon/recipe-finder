import useBreadcrumbs from "@/hooks/use-breadcrumbs/use-breadcrumbs";
import BreadcrumbsItem from "./breadcrumbs-item";

function Breadcrumbs() {
  const breadcrumbItems = useBreadcrumbs();

  return (
    <nav className="mb-4 text-sm">
      {breadcrumbItems.map(function mapBreadcrumb(breadcrumb) {
        return (
          <BreadcrumbsItem key={breadcrumb.pathname} breadcrumb={breadcrumb} />
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
