import { motion as m } from "framer-motion";
import { InputField } from "../components/InputField";
import { PiMagnifyingGlass } from "react-icons/pi";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export default function Landing() {
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
          <div className="mb-6 font-semibold text-3xl text-base127d">
            Lorem ipsum
          </div>

          <div className="flex max-w-[30rem] items-center gap-3 w-full">
            <span className="flex-1">
              <InputField
                name="search"
                placeholder="Find a food establishment"
                onChange={() => {}}
                type="text"
              />
            </span>

            <span>
              <Button
                type="button"
                action="search"
                style="orange"
                icon={PiMagnifyingGlass}
                onClick={() => {}}
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
