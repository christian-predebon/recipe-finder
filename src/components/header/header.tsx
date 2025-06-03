import logoSource from "@/assets/recipe-book.png";
import { ROUTES } from "@/consts/routes.const";
import {
  BOOKMARK_BUTTON_TEXT,
  HEADER_TITLE,
  SEARCH_BUTTON_TEXT,
} from "@/consts/text.const";
import useHeaderMenuState from "@/hooks/use-header-menu-state/use-header-menu-state";
import useIsSmallScreen from "@/hooks/use-is-small-screen/use-is-small-screen";
import { useEffect } from "react";
import { Heart, Menu, Search } from "react-feather";
import { useNavigate } from "react-router";
import Button from "../input/button/button";

function Header() {
  const navigate = useNavigate();
  const { isMenuOpen, menuRef, openMenu, closeMenu } = useHeaderMenuState();
  const isSmallScreen = useIsSmallScreen();

  useEffect(function detectClickOutside() {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return function cleanup() {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateToHome = () => {
    navigate(ROUTES.HOME);
    closeMenu();
  };

  const navigateToFavorites = () => {
    navigate(ROUTES.FAVORITES);
    closeMenu();
  };

  const navigateToSearch = () => {
    navigate(ROUTES.SEARCH);
    closeMenu();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={navigateToHome}
          >
            <img src={logoSource} alt="logo" className="h-10 w-10" />
            <h2 className="text-lg font-semibold text-gray-800">
              {HEADER_TITLE}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={navigateToSearch}
              icon={<Search className="h-5 w-5" />}
              title={!isSmallScreen ? SEARCH_BUTTON_TEXT : undefined}
            />
            <div className="relative" ref={menuRef}>
              {isSmallScreen ? (
                <Button
                  onClick={openMenu}
                  icon={<Menu className="h-5 w-5" />}
                />
              ) : (
                <Button
                  onClick={navigateToFavorites}
                  icon={
                    <Heart
                      className="h-3.5 w-3.5 text-red-dark"
                      fill="currentColor"
                    />
                  }
                  title={BOOKMARK_BUTTON_TEXT}
                />
              )}

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      onClick={navigateToFavorites}
                    >
                      <Heart
                        className="h-3.5 w-3.5 text-red-dark"
                        fill="currentColor"
                      />
                      {BOOKMARK_BUTTON_TEXT}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
