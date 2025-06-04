import { useMatches } from "react-router-dom";

export interface BreadcrumbItem {
  pathname: string;
  title: string;
  isLast: boolean;
}

interface BreadcrumbHandle {
  breadcrumb: string;
}

function useBreadcrumbs(): BreadcrumbItem[] {
  const matches = useMatches();

  return matches
    .filter((match) => (match.handle as BreadcrumbHandle)?.breadcrumb)
    .map(function mapBreadcrumbs(match, index) {
      return {
        pathname: match.pathname,
        title: (match.handle as BreadcrumbHandle).breadcrumb,
        isLast: index === matches.length - 1,
      };
    });
}

export default useBreadcrumbs;
