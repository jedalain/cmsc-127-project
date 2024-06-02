import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./pages/Landing.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import Feed from "./pages/Feed.tsx";
import Profile from "./pages/Profile.tsx";
import ESTExpandedView from "./components/feed/ESTExpandedView.tsx";
import { InexistingPage } from "./pages/InexistentPage.tsx";
import FoodItemFeed from "./pages/FoodItemFeed.tsx";

function App() {
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
      path: "/food-items",
      element: (
        <AuthPage>
          <FoodItemFeed />
        </AuthPage>
      ),
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
    {
      path: "/*",
      element: <InexistingPage />,
    },
  ]);

  return (
    <div className="h-full w-full bg-base127">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
