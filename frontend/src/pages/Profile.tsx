import { useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { PiUserCircleFill } from "react-icons/pi";
import { PRTabs } from "../components/profile/PRTabs";
import PRReviews from "../components/profile/PRReviews";
import { Pagination } from "../components/Pagination.tsx";
import PREstablishments from "../components/profile/PREstablishments.tsx";
import ESTExpandedView from "../components/feed/ESTExpandedView.tsx";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<string>("reviews");
  const [establishmentId, setEstablishmentId] = useState<string>("");

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
        <div className="flex h-full gap-6 min-h-screen flex-col">
          <div className="flex flex-col items-center text-blue127 w-full">
            <PiUserCircleFill size={150} />
            <span></span>
          </div>

          <div className="w-full h-full flex flex-col overflow-auto rounded-lg border border-base127c p-3">
            <div className="sticky left-0">
              <PRTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div
              className={`z-0 h-full items-center flex flex-col justify-between w-full min-w-[600px] rounded-lg bg-base127b p-10 ${
                activeTab === "reviews" ? "rounded-tl-none" : "rounded-tr-none"
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
                    <PRReviews
                      currentPage={1}
                      setEstablishmentId={setEstablishmentId}
                      filter=""
                      reviewsPerPage={10}
                    />
                  )}

                  {activeTab === "establishments" && (
                    <PREstablishments setEstablishmentId={setEstablishmentId} />
                  )}
                </m.div>
              </AnimatePresence>
              <div className="flex items-center">
                <Pagination
                  currentPage={1}
                  totalPages={1}
                  setCurrentPage={() => {}}
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
    </m.div>
  );
}
