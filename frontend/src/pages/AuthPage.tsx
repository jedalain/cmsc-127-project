import { createContext, useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar.tsx";
import { validateToken } from "../utils/helper.ts";
import { InexistingPage } from "./InexistentPage.tsx";
import api from "../api/api.ts";
import Footer from "../components/Footer.tsx";

interface AuthPageProps {
  children: JSX.Element;
}

interface AuthPageContext {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export const AuthPageContext = createContext<AuthPageContext>({
  isLoggedIn: false,
  isAdmin: false,
});

export default function AuthPage({ children }: AuthPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // for checking if the current route is only for logged in
  const isLoggedInRoute = location.pathname.startsWith("/profile");

  const checkIfAdmin = async () => {
    try {
      const token = sessionStorage.getItem("tt_token");
      if (!token) {
        return { isAdmin: false };
      }

      const response = await api.post("/users/check-admin", null, {
        headers: {
          Authorization: token,
        },
      });

      console.log(response);
      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const checkLoggedIn = () => {
      const { isLoggedIn } = validateToken();
      setIsLoggedIn(isLoggedIn);
    };

    checkLoggedIn();
  });

  useEffect(() => {
    checkIfAdmin();
  }, [isLoggedIn]);

  console.log(isLoggedIn);
  /** Function - Gets current pathname and returns a string value */
  const getPathname = (pathname: string) => {
    if (isLoggedIn) {
      switch (pathname) {
        case "/home":
          return "TasteTracker";
        case "/establishments":
          return "Establishments";
        case "/food-items":
          return "Food Items";
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
        case "/food-items":
          return "Food Items";
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
      <AuthPageContext.Provider
        value={{ isLoggedIn: isLoggedIn, isAdmin: isAdmin }}
      >
        <NavigationBar />
        {children}
        <Footer />
      </AuthPageContext.Provider>
    ) : (
      <AuthPageContext.Provider
        value={{ isLoggedIn: isLoggedIn, isAdmin: isAdmin }}
      >
        <InexistingPage />
      </AuthPageContext.Provider>
    )
  ) : (
    <AuthPageContext.Provider
      value={{ isLoggedIn: isLoggedIn, isAdmin: isAdmin }}
    >
      <NavigationBar />
      {children}
      <Footer />
    </AuthPageContext.Provider>
  );
}
