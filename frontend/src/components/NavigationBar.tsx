import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthPageContext } from "../pages/AuthPage.tsx";

export default function NavigationBar() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthPageContext);

  return (
    <header className=" z-10 flex w-full flex-wrap border-b-2 border-base127b  bg-base127 py-2 text-sm sm:flex-nowrap sm:justify-start sm:py-0">
      <nav
        className="a relative text-black127 h-[60px] mx-auto w-full max-w-[1080px] px-4 flex items-center justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <Link to={"/"} className="text-lg font-semibold">
          TasteTracker
        </Link>

        <div className="flex items-center gap-9">
          {isLoggedIn ? (
            <Link
              to={"/profile"}
              className="text-black127 hover:text-orange127 transition-all duration-75"
            >
              Profile
            </Link>
          ) : (
            ""
          )}
          <div className="text-black127 hover:text-orange127 cursor-pointer transition-all duration-75">
            {isLoggedIn ? (
              <div
                onClick={() => {
                  sessionStorage.removeItem("tt_token");
                  navigate("/");
                }}
              >
                Sign Out
              </div>
            ) : (
              <Link to={"/sign-in"}>Sign in</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
