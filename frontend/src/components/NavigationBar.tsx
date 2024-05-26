import { Link, useLocation } from "react-router-dom";
import { InputField } from "./InputField.tsx";
import { PiMagnifyingGlass } from "react-icons/pi";

interface NavigationBarProps {
  isLoggedIn: boolean;
}

export default function NavigationBar(props: NavigationBarProps) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className=" z-10 flex w-full flex-wrap border-b-2 border-base127b  bg-base127 py-3 text-sm sm:flex-nowrap sm:justify-start sm:py-0">
      <nav
        className="a relative text-black127 h-[60px] mx-auto w-full max-w-[1080px] px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <Link to={"/"} className="text-lg font-semibold">
          Lorem ipsum
        </Link>

        <div className="flex items-center gap-9">
          {path !== "/" && (
            <span>
              <InputField
                name="search"
                placeholder="Search"
                icon={PiMagnifyingGlass}
                onChange={() => {}}
                type="text"
              />
            </span>
          )}
          {props.isLoggedIn ? (
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
            {props.isLoggedIn ? (
              "Sign Out"
            ) : (
              <Link to={"/sign-in"}>Sign in</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
