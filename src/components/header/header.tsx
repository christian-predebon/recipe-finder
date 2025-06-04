import logoSource from "@/assets/recipe-book.png";
import { ROUTES } from "@/consts/routes.const";
import { HEADER_TITLE } from "@/consts/text.const";
import useHeaderMenuState from "@/hooks/use-header-menu-state/use-header-menu-state";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderActions from "./components/header-actions";
import HeaderMenuPopup from "./components/header-menu-popup";

function Header() {
  const navigate = useNavigate();
  const { isMenuOpen, menuRef, closeMenu, openMenu } = useHeaderMenuState();

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
            <div ref={menuRef}>
              <HeaderActions
                onClickFavorites={navigateToFavorites}
                onClickSearch={navigateToSearch}
                onOpenMenu={openMenu}
              />

              {isMenuOpen && (
                <HeaderMenuPopup
                  onClickFavorites={navigateToFavorites}
                  onClickSearch={navigateToSearch}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
