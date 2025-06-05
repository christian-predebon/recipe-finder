import { useEffect, useState } from "react";

const BREAKPOINT_WIDTH = 768;

function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    () => window.innerWidth < BREAKPOINT_WIDTH
  );

  useEffect(function updateScreenSize() {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < BREAKPOINT_WIDTH);
    };

    updateScreenSize();

    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return isSmallScreen;
}

export default useIsSmallScreen;
