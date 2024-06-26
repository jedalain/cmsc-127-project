import { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { PiUserCircleFill } from "react-icons/pi";

import { PRTabs } from "../components/profile/PRTabs.tsx";
import PRReviews from "../components/profile/PRReviews.tsx";
import { Pagination } from "../components/Pagination.tsx";
import PREstablishments from "../components/profile/PREstablishments.tsx";
import ESTExpandedView from "../components/feed/ESTExpandedView.tsx";
import api from "../api/api.ts";
import { foodEstablishment, review, user } from "../models/Models.tsx";
import { FIReviewFilter } from "../components/feed/FIFilter.tsx";
import { EmptyReviews } from "../components/EmptyResults.tsx";
import { PREmpty } from "../components/profile/PREmpty.tsx";

export default function Profile() {
  const [userProfile, setUserProfile] = useState<user | null>(null);
  const [userReviews, setUserReviews] = useState<review[]>([]);
  const [userEstablishments, setUserEstablishments] = useState<
    foodEstablishment[]
  >([]);
  const [activeTab, setActiveTab] = useState<string>("reviews");
  const [establishmentId, setEstablishmentId] = useState<string>("");

  // filter for review
  const [reviewFilterApplied, setReviewFilterApplied] = useState<string>("");

  // pagination for review & establishments
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentReviews, setCurrentReviews] = useState<review[]>([]);
  const reviewPerPage = 5;
  const [currentEstablishments, setCurrentEstablishments] = useState<
    foodEstablishment[]
  >([]);
  const establishmentPerPage = 3;

  /** API Call - fetch user data */
  const fetchProfileData = async () => {
    try {
      const token = sessionStorage.getItem("tt_token");

      const userData = await api.get("/users/profile", {
        headers: {
          Authorization: token,
        },
        params: {
          monthYear: reviewFilterApplied,
        },
      });

      setUserProfile(userData.data.profile);
      setUserReviews(userData.data.reviews);
      setUserEstablishments(userData.data.establishments);
    } catch (error) {
      setUserProfile(null);
      setUserReviews([]);
      setUserEstablishments([]);
    }
  };

  useEffect(() => {
    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewFilterApplied]);

  useEffect(() => {
    setCurrentPage(1);
    setEstablishmentId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, reviewFilterApplied]);

  useEffect(() => {
    setCurrentReviews(
      userReviews.slice(
        (currentPage - 1) * reviewPerPage,
        currentPage * reviewPerPage
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, userReviews, reviewFilterApplied]);

  useEffect(() => {
    setCurrentEstablishments(
      userEstablishments.slice(
        (currentPage - 1) * establishmentPerPage,
        currentPage * establishmentPerPage
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, userEstablishments]);

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
      {userProfile ? (
        <div className="flex h-full w-full max-w-[1080px] flex-col gap-3 p-6">
          <div className="flex h-full gap-6 min-h-screen flex-col">
            <div className="flex flex-col items-center text-blue127 w-full">
              <PiUserCircleFill size={150} />
              <span className="text-xl font-medium">
                {userProfile.fname + " " + userProfile?.lname}
              </span>
            </div>

            <div className="w-full h-full flex flex-col overflow-auto rounded-lg border border-base127c p-3">
              <div className="sticky left-0">
                <PRTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>

              <div
                className={`z-0 h-full items-center flex flex-col min-h-[300px] justify-between w-full min-w-[600px] rounded-lg bg-base127b p-10 ${
                  activeTab === "reviews"
                    ? "rounded-tl-none"
                    : "rounded-tr-none"
                }`}
              >
                <AnimatePresence mode="wait">
                  <m.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 25 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-full"
                  >
                    {activeTab === "reviews" && (
                      <div className="flex items-end flex-col gap-3">
                        <FIReviewFilter
                          filterApplied={reviewFilterApplied}
                          setFilterApplied={setReviewFilterApplied}
                        />
                        {userReviews.length > 0 ? (
                          <PRReviews
                            reviews={currentReviews}
                            setEstablishmentId={setEstablishmentId}
                          />
                        ) : (
                          <EmptyReviews />
                        )}
                      </div>
                    )}

                    {activeTab === "establishments" && (
                      <PREstablishments
                        establishments={currentEstablishments}
                        setEstablishmentId={setEstablishmentId}
                      />
                    )}
                  </m.div>
                </AnimatePresence>

                <div className="flex items-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={
                      activeTab === "reviews"
                        ? Math.ceil(userReviews.length / reviewPerPage)
                        : Math.ceil(
                            userEstablishments.length / establishmentPerPage
                          )
                    }
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>

              {establishmentId !== "" && (
                <div>
                  <ESTExpandedView establishmentId={establishmentId} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <PREmpty />
      )}
    </m.div>
  );
}
