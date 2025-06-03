import { SearchType } from "@/hooks/use-recipe-search/use-recipe-search";
import { Search, X as XIcon } from "react-feather";

interface RecipeSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
}

function RecipeSearch({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
}: Readonly<RecipeSearchProps>) {
  return (
    <div className="w-full">
      <div className="flex gap-4 mb-2">
        <button
          onClick={() => setSearchType(SearchType.INGREDIENT)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            searchType === SearchType.INGREDIENT
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Per ingrediente
        </button>
        <button
          onClick={() => setSearchType(SearchType.NAME)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            searchType === SearchType.NAME
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Per nome
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            searchType === SearchType.INGREDIENT
              ? "Cerca per ingrediente..."
              : "Cerca per nome..."
          }
          className="w-full px-4 py-2.5 pl-10 text-gray-700 bg-white rounded-lg
                border border-gray-200
                focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent
                transition-all duration-200 text-base placeholder-gray-400"
        />
        <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />

        <button
          onClick={() => setSearchQuery("")}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-gray-600 cursor-pointer hover:bg-gray-100 rounded-full p-2 transition-all duration-100 ${
            searchQuery ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          aria-label="Clear search"
        >
          <XIcon className="h-4 w-4 text-gray-400" />
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-1 font-semibold">
        {searchType === SearchType.INGREDIENT
          ? "Inserisci il nome di un ingrediente"
          : "Inserisci il nome di una ricetta"}
      </p>
    </div>
  );
}

export default RecipeSearch;
