import { createContext, useState } from "react";
import NavigationBar from "../components/NavigationBar.tsx";

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  return (
    <AuthPageContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      <NavigationBar isLoggedIn={isLoggedIn} />
      {children}
      {/* {alertBubble !== null ? alertBubble : ""} */}
      {/* // <Footer /> */}
    </AuthPageContext.Provider>
  );
}
