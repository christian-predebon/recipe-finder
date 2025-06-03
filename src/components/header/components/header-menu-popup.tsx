import { BOOKMARK_BUTTON_TEXT } from "@/consts/text.const";
import { Heart } from "react-feather";

interface HeaderMenuPopupProps {
  onClickFavorites: () => void;
}

function HeaderMenuPopup({ onClickFavorites }: Readonly<HeaderMenuPopupProps>) {
  return (
    <div className="absolute right-4 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical">
        <button
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          onClick={onClickFavorites}
        >
          <Heart className="h-3.5 w-3.5 text-red-dark" fill="currentColor" />
          {BOOKMARK_BUTTON_TEXT}
        </button>
      </div>
    </div>
  );
}

export default HeaderMenuPopup;
