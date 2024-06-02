import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import ESTCard from "../components/feed/ESTCard.tsx";
import { foodEstablishment } from "../models/Models.tsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ScrollToTop } from "../utils/helper.ts";
import { ESTFilter } from "../components/feed/ESTFilter.tsx";
import api from "../api/api.ts";
import axios from "axios";
import { EmptyEstablishments } from "../components/EmptyResults.tsx";

export default function Feed() {
  const navigate = useNavigate();
  const [filterApplied, setFilterApplied] = useState<string>("");
  const [establishments, setEstablishments] = useState<foodEstablishment[]>([]);

  // parameter/s from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || ""; // keyword
  const establishmentId = searchParams.get("id") || ""; // id

  /** API Call - fetch establishments from database */
  const fetchEstablishments = async () => {
    try {
      const token = sessionStorage.getItem("tt_token");

      const response = await api.get("/", {
        headers: {
          Authorization: token,

          keyword: keyword,
          filter: filterApplied,
        },
      });

      setEstablishments(response.data.establishments);
    } catch (error) {
      setEstablishments([]);

      let message;
      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message || "Cannot fetch establishments";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    }
  };

  /** Function - updates the state of searchInput  */
  const openEstablishment = (establishmentId: string) => {
    if (establishmentId) {
      navigate(
        `/establishments/detailed?id=${encodeURIComponent(establishmentId)}`
      );
      ScrollToTop();
    }
  };

  useEffect(() => {
    fetchEstablishments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterApplied, keyword]);

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
            {establishments.length > 0 ? (
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
            ) : (
              <div className="h-screen">
                <EmptyEstablishments />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </m.div>
  );
}
