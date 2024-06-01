import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./pages/Landing.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import LoggedInPage from "./pages/LoggedInPage.tsx";
import LoggedOutPage from "./pages/LoggedOutPage.tsx";
import Feed from "./pages/Feed.tsx";
import Profile from "./pages/Profile.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? (
        <LoggedInPage>
          <Landing />
        </LoggedInPage>
      ) : (
        <LoggedOutPage>
          <Landing />
        </LoggedOutPage>
      ),
    },
    {
      path: "/establishments",
      element: isLoggedIn ? (
        <LoggedInPage>
          <Feed />
        </LoggedInPage>
      ) : (
        <LoggedOutPage>
          <Feed />
        </LoggedOutPage>
      ),
    },
    {
      path: "/profile",
      element: isLoggedIn ? (
        <LoggedOutPage>
          <Feed />
        </LoggedOutPage>
      ) : (
        <LoggedInPage>
          <Profile />
        </LoggedInPage>
      ),
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
  ]);

  return (
    <div className="h-full w-full bg-base127">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
