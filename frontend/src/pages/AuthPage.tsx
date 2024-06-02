import { createContext, useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar.tsx";
import { validateToken } from "../utils/helper.ts";
import { InexistingPage } from "./InexistentPage.tsx";

interface AuthPageProps {
  children: JSX.Element;
}

interface AuthPageContext {
  isLoggedIn: boolean;
}

export const AuthPageContext = createContext<AuthPageContext>({
  isLoggedIn: true,
});

export default function AuthPage({ children }: AuthPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // for checking if the current route is only for logged in
  const isLoggedInRoute = location.pathname.startsWith("/profile");

  useEffect(() => {
    const checkLoggedIn = async () => {
      const { isLoggedIn } = await validateToken();
      setIsLoggedIn(isLoggedIn);
    };

    checkLoggedIn();
  });

  /** Function - Gets current pathname and returns a string value */
  const getPathname = (pathname: string) => {
    if (isLoggedIn) {
      switch (pathname) {
        case "/home":
          return "TasteTracker";
        case "/establishments":
          return "Establishments";
        case "/profile":
          return "Profile";
        default:
          return "TasteTracker";
      }
    } else {
      switch (pathname) {
        case "/home":
          return "TasteTracker";
        case "/establishments":
          return "Establishments";
        default:
          return "TasteTracker";
      }
    }
  };

  useEffect(() => {
    document.title = getPathname(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return isLoggedInRoute ? (
    isLoggedIn ? (
      <AuthPageContext.Provider value={{ isLoggedIn: isLoggedIn }}>
        <NavigationBar />
        {children}
        {/* // <Footer /> */}
      </AuthPageContext.Provider>
    ) : (
      <AuthPageContext.Provider value={{ isLoggedIn: isLoggedIn }}>
        <InexistingPage />
      </AuthPageContext.Provider>
    )
  ) : (
    <AuthPageContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      <NavigationBar />
      {children}
      {/* // <Footer /> */}
    </AuthPageContext.Provider>
  );
}
