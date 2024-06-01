import { useState } from "react";
import { motion as m } from "framer-motion";
import ESTCard from "../components/feed/ESTCard.tsx";
import { foodEstablishment, mcdo } from "../models/Models.tsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ScrollToTop } from "../utils/helper.ts";
import { ESTFilter } from "../components/feed/ESTFilter.tsx";

export default function Feed() {
  const navigate = useNavigate();
  const [filterApplied, setFilterApplied] = useState<string>("");
  const [establishments] = useState<foodEstablishment[]>([
    mcdo,
    mcdo,
    mcdo,
    mcdo,
    mcdo,
  ]);

  // fetches the id from the parameter
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const establishmentId = searchParams.get("id") || "";

  /** Function - updates the state of searchInput  */
  const openEstablishment = (establishmentId: string) => {
    if (establishmentId) {
      navigate(
        `/establishments/detailed?id=${encodeURIComponent(establishmentId)}`
      );
      ScrollToTop();
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
      {establishmentId === "" ? (
        <div className="flex h-full w-full max-w-[1080px] flex-col gap-3 p-6">
          <div className="flex h-full gap-9 min-h-screen flex-col">
            <span>
              <ESTFilter
                filterApplied={filterApplied}
                setFilterApplied={setFilterApplied}
                sortEstablishments={() => {}}
              />
            </span>
            <div className="flex-[3] w-full h-full gap-6 grid grid-cols-1 auto-rows-min xs:grid-cols-2 sm:grid-cols-3">
              {establishments.map((establishment, key) => {
                return (
                  <div className="h-full w-full" onClick={() => {}}>
                    <span key={key}>
                      <ESTCard
                        name={establishment.name}
                        avgRating={establishment.avgRating}
                        address={establishment.address}
                        openDetailed={() => {
                          openEstablishment(establishment.establishmentId);
                        }}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </m.div>
  );
}
