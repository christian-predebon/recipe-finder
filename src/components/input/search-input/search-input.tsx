import { Search, X as XIcon } from "react-feather";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onClear: () => void;
}

function SearchInput({
  value,
  onChange,
  placeholder,
  onClear,
}: Readonly<SearchInputProps>) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 pl-10 text-gray-700 bg-white rounded-lg
                border border-gray-200
                focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent
                transition-all duration-200 text-base placeholder-gray-400"
      />
      <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />

      <button
        onClick={onClear}
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-gray-600 cursor-pointer hover:bg-gray-100 rounded-full p-2 transition-all duration-100 ${
          value ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-label="Pulisci ricerca"
      >
        <XIcon className="h-4 w-4 text-gray-400" />
      </button>
    </div>
  );
}

export default SearchInput;
