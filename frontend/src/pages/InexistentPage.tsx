import { PiSealWarning } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Button } from "../components/Button.tsx";

export function InexistingPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-base0">
      <div className="flex h-full w-full max-w-[1080px] flex-col items-center justify-center gap-3 p-6 text-red127">
        <PiSealWarning size={100} />
        <span className="text-2xl font-semibold">Page does not exist</span>
        <span className="font-regular text-md">
          The page you are looking for does not exist.
        </span>
        <div className="mt-6 w-full max-w-[15rem]">
          <Link to="/">
            <Button
              action="home"
              style="red"
              text="Go back to home"
              onClick={() => {}}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
