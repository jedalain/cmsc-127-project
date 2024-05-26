import { motion as m } from "framer-motion";
import { InputField } from "../components/InputField";
import { PiMagnifyingGlass } from "react-icons/pi";
import { useState } from "react";
import ESTCard from "../components/feed/ESTCard.tsx";
import { foodEstablishment, mcdo } from "../models/Models.tsx";
import ESTExpandedView from "../components/feed/ESTExpandedView.tsx";

export default function Feed() {
  const [establishments] = useState<foodEstablishment[]>([
    mcdo,
    mcdo,
    mcdo,
    mcdo,
    mcdo,
  ]);

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
      <div className="flex h-full w-full max-w-[1080px] flex-col gap-3 p-6">
        <div className="flex h-full gap-6 min-h-screen md:flex-row flex-col">
          <div className="h-full max-h-[400px] overflow-y-auto md:max-h-screen w-full flex-1 md:h-screen bg-orange127 rounded-xl p-6">
            <span className="sticky top-0">
              <InputField
                name="search"
                placeholder="Search"
                icon={PiMagnifyingGlass}
                onChange={() => {}}
                type="text"
              />
            </span>

            <div className="mt-3 w-full grid md:grid-cols-1 grid-rows-1">
              {establishments.map((establishment, key) => {
                return (
                  <div className="h-full w-full py-2">
                    <span key={key}>
                      <ESTCard
                        name={establishment.name}
                        avgRating={establishment.avgRating}
                        address={establishment.address}
                        openDetailed={() => {}}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-[4] p-6 border-2 rounded-xl border-base127b">
            <ESTExpandedView foodEstablishment={mcdo} />
          </div>
        </div>
      </div>
    </m.div>
  );
}
