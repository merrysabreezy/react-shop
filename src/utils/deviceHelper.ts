import { useState, useEffect } from "react";

export function useIsSmallScreen(): boolean {
  const checkIsSmallDevice = () => {
    const isSmallScreen = window.innerWidth <= 1024;
    const isMobileUserAgent = /Android|iPhone|iPad|iPod|Windows Phone/i.test(
      navigator.userAgent
    );
    return isSmallScreen || isMobileUserAgent;
  };

  const [isSmallScreen, setIsSmallScreen] = useState(checkIsSmallDevice());

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(checkIsSmallDevice());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isSmallScreen;
}
