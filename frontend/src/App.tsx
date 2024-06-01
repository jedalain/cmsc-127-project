import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./pages/Landing.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import AuthPage from "./pages/LoggedInPage.tsx";
import LoggedOutPage from "./pages/LoggedOutPage.tsx";
import Feed from "./pages/Feed.tsx";
import Profile from "./pages/Profile.tsx";
import ESTExpandedView from "./components/feed/ESTExpandedView.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthPage>
          <Landing />
        </AuthPage>
      ),
    },
    {
      path: "/establishments",
      element: (
        <AuthPage>
          <Feed />
        </AuthPage>
      ),
      children: [
        {
          path: "detailed",
          element: <ESTExpandedView />,
        },
      ],
    },
    {
      path: "/profile",
      element: (
        <AuthPage>
          <Profile />
        </AuthPage>
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
