import { useState } from "react";
import { foodEstablishment, mcdo } from "../../models/Models.tsx";
import { PiArrowsOutSimpleLight, PiStarFill } from "react-icons/pi";

export default function PREstablishments() {
  const [chosenEstablishment, setChosenEstablishment] =
    useState<foodEstablishment | null>(null);
  const [establishments, setEstablishments] = useState<foodEstablishment[]>([
    mcdo,
    mcdo,
    mcdo,
    mcdo,
    mcdo,
    mcdo,
    mcdo,
  ]);

  return (
    <div className="h-full w-full gap-3 grid grid-cols-3 grid-rows-3">
      {establishments.map((establishment, index) => {
        return (
          <div key={index} className="w-full h-full flex flex-col gap-3">
            <div className="text-base127d gap-2 bg-base127b2 flex flex-col text-sm rounded-lg p-3 w-full h-[75px]">
              <span className="flex items-center justify-between font-medium">
                <span className="flex gap-1 line-clamp-1 items-center">
                  {establishment.name}
                </span>
                <span
                  className="cursor-pointer hover:opacity-70 transition-all active:scale-95"
                  onClick={() => {
                    setChosenEstablishment(establishment);
                  }}
                >
                  <PiArrowsOutSimpleLight />
                </span>
              </span>
              <span className="flex items-center gap-1 font-normal">
                <PiStarFill color="#FDE767" /> {establishment.avgRating}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
