import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import { PiMagnifyingGlass } from "react-icons/pi";

import { InputField } from "../components/InputField.tsx";
import { Button } from "../components/Button.tsx";
import { ScrollToTop } from "../utils/helper.ts";

export default function Landing() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("");

  /** Function - updates the searchInput state with current value entered in search bar */
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  /** Function - triggers search function when user hits enter  */
  const onEnterSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const searchValue = searchInput.trim();
      if (searchValue !== "") {
        navigate(`/establishments?keyword=${encodeURIComponent(searchValue)}`);
        ScrollToTop();
      } else {
        navigate("/establishments");
      }
    }
  };

  /** Function - triggers search function when user hits enter  */
  const onButtonSearch = () => {
    const searchValue = searchInput.trim();
    if (searchValue !== "") {
      navigate(`/establishments?keyword=${encodeURIComponent(searchValue)}`);
      ScrollToTop();
    } else {
      navigate("/establishments");
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.05,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <div className="flex -mt-20 h-full w-full max-w-[1080px] flex-col gap-3 p-6">
        <div className="h-screen w-full flex flex-col gap-3 justify-center items-center">
          <div className="mb-6 font-semibold flex flex-col text-3xl text-base127d">
            TasteTracker
            <span className="text-sm text-right font-light">by Tininiw</span>
          </div>

          <div className="flex max-w-[30rem] items-center gap-3 w-full">
            <span className="flex-1">
              <InputField
                name="search"
                placeholder="Find a food establishment"
                onChange={handleSearchInput}
                type="text"
                onEnter={onEnterSearch}
              />
            </span>

            <span>
              <Button
                type="button"
                action="search"
                style="orange"
                icon={PiMagnifyingGlass}
                onClick={onButtonSearch}
              />
            </span>
          </div>

          <div>
            <Link
              to={"/establishments"}
              className="text-base127d cursor-pointer font-normal hover:text-green127 transition-all duration-75 text-md"
            >
              See all establishments
            </Link>
          </div>
        </div>
      </div>
    </m.div>
  );
}
