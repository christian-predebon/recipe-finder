import { useEffect, useState } from "react";

const BREAKPOINT = 768;

function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    () => window.innerWidth < BREAKPOINT
  );

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < BREAKPOINT);
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
