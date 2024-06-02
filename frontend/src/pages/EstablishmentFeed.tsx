import { ChangeEvent, useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import axios from "axios";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import api from "../api/api.ts";
import ESTCard from "../components/feed/ESTCard.tsx";
import { foodEstablishment } from "../models/Models.tsx";
import { ScrollToTop } from "../utils/helper.ts";
import { ESTFilter } from "../components/feed/ESTFilter.tsx";
import { EmptyEstablishments } from "../components/EmptyResults.tsx";

export default function EstablishmentFeed() {
  const navigate = useNavigate();
  // parameter/s from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || ""; // keyword
  const establishmentId = searchParams.get("id") || ""; // id

  const [filterApplied, setFilterApplied] = useState<{
    keyword: string;
    rating: number;
  }>({
    keyword: keyword,
    rating: 0,
  });
  const [establishments, setEstablishments] = useState<foodEstablishment[]>([]);

  /** API Call - fetch establishments from database */
  const fetchEstablishments = async () => {
    try {
      const token = sessionStorage.getItem("tt_token");

      const response = await api.get("/", {
        headers: {
          Authorization: token,

          keyword: filterApplied.keyword,
          filter: filterApplied.rating,
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

  /** Function - apply filter */
  const applyFilter = () => {
    fetchEstablishments();
  };

  /** Function - clear applied filter */
  const clearFilter = () => {
    setFilterApplied({
      keyword: "",
      rating: 0,
    });

    fetchEstablishments();
  };

  /** Function - updates the state filterApplied */
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterApplied((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
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
  }, []);

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
          <div className="flex h-full flex-col-reverse md:flex-row gap-9 min-h-screen">
            <div className="flex-1">
              {establishments.length > 0 ? (
                <div className="flex-[3] w-full h-full gap-6 grid grid-cols-1 auto-rows-min xs:grid-cols-2 md:grid-cols-3">
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

            <span className="md:sticky md:top-6 flex flex-col gap-3 bg-base127b2 h-fit p-3 rounded-lg">
              <span className="text-blue127b">FILTER</span>
              <ESTFilter
                filterApplied={filterApplied}
                onChange={handleFilterChange}
                onApply={applyFilter}
                onClear={clearFilter}
              />
            </span>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </m.div>
  );
}
