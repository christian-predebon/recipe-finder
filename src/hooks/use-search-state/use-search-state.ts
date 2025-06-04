import { SearchType } from "@/hooks/use-recipe-search/use-recipe-search";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useSearchState() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentParams = new URLSearchParams(location.search);
  const initialQuery = currentParams.get("q") ?? "";
  const initialType = (currentParams.get("type") as SearchType) ?? SearchType.INGREDIENT;

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<SearchType>(initialType);

  const getUpdatedSearchParams = () => new URLSearchParams(location.search);

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);

    const updatedParams = getUpdatedSearchParams();

    if (query) {
      updatedParams.set("q", query);
    } else {
      updatedParams.delete("q");
    }

    navigate({ search: updatedParams.toString() }, { replace: true });
  };

  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);

    const updatedParams = getUpdatedSearchParams();
    updatedParams.set("type", type);

    navigate({ search: updatedParams.toString() }, { replace: true });
  };

  return {
    searchQuery,
    searchType,
    handleSearchQueryChange,
    handleSearchTypeChange,
  };
}