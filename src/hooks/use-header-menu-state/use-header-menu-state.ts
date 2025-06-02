import { useRef, useState } from "react";

function useHeaderMenuState() {
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return { isMenuOpen, menuRef, openMenu, closeMenu };

  function openMenu() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }
}

export default useHeaderMenuState;
