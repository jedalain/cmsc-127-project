import { PiSealWarning } from "react-icons/pi";
import { Button } from "../Button";

export function PREmpty() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-base0">
      <div className="flex h-full w-full max-w-[1080px] flex-col items-center justify-center gap-3 p-6 text-red127">
        <PiSealWarning size={100} />
        <span className="text-2xl font-semibold">UH-OH</span>
        <span className="font-regular text-md">
          There was an error loading your profile.
        </span>
        <div className="mt-6 w-full max-w-[15rem]">
          <Button
            action="home"
            style="red"
            text="Reload"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    </div>
  );
}
