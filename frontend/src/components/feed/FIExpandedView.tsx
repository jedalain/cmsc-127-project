import { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { PiPlusCircleFill, PiStarFill } from "react-icons/pi";

import { Button } from "../Button.tsx";
import { foodItem, mcflurry, review } from "../../models/Models.tsx";
import { Pagination } from "../Pagination.tsx";
import ReviewCard from "../ReviewCard.tsx";
import { ReviewModal } from "./ReviewModal.tsx";

interface FIExpandedViewProps {
  foodItemId: string;
  closeModal: () => void;
}

/**
 * CPEditProfile
 *
 * @param foodItemId the id of the chosen food item
 * @param closeModal closes edit profile modal
 *
 * @returns modal for editing profile
 */
export function FIExpandedView(props: FIExpandedViewProps) {
  const [foodItem] = useState<foodItem | null>(mcflurry);
  const [currentPageReview, setCurrentPageReview] = useState<number>(1);
  const [currentReviews, setCurrentReviews] = useState<review[]>([]);

  const totalReviews = foodItem?.reviews.length;
  const reviewPerPage = 9;

  /** Function - gets the total available pages depending on the items displayed per page and total amount of items */
  const getTotalPages = (maxQtyPerPage: number, totalQty: number) => {
    return Math.ceil(totalQty / maxQtyPerPage);
  };

  /** useEffect - updates the content of currentFoodItems state depending on the current page */
  useEffect(() => {
    if (foodItem) {
      setCurrentReviews(
        foodItem.reviews.slice(
          (currentPageReview - 1) * reviewPerPage,
          currentPageReview * reviewPerPage
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageReview]);

  // Disables scroll when modal is opened
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const [newReview, setNewReview] = useState<boolean>(false);

  /** Function - closes the review modal */
  const toggleReviewModal = () => {
    setNewReview(!newReview);
  };

  return (
    <div className="pointer-events-auto overflow-y-hidden fixed start-0 top-0 z-20 size-full overflow-x-hidden">
      <div className="m-3 mt-0 flex min-h-screen items-center transition-all ease-out sm:mx-auto sm:w-full sm:max-w-lg">
        {foodItem && (
          <div className="pointer-events-auto flex h-fit rounded-xl w-full flex-col border border-base127c bg-base127">
            <div className="flex items-center justify-between border-b border-base127c px-4 py-3">
              <h3 className="flex w-full justify-center text-xl font-semibold text-green0">
                {foodItem.name}
              </h3>

              <button
                type="button"
                className="flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-black transition-all hover:bg-base1 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => {
                  props.closeModal();
                }}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="size-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>

            <div className="flex-1 flex gap-3 text-orange127c justify-between items-start max-h-[75px] p-4">
              <div className="flex items-center flex-1 flex-col">
                <span className="text-sm font-light">Price:</span>
                <span>{foodItem.price}</span>
              </div>

              <div className="flex items-center flex-1 flex-col">
                <span className="text-sm font-light">Classification:</span>
                <span>{foodItem.classification}</span>
              </div>

              <div className="flex items-center flex-1 flex-col">
                <span className="text-sm font-light">Avg. Rating:</span>
                <span className="flex items-center gap-1">
                  <PiStarFill color="#FDE767" />
                  {foodItem.avgRating}
                </span>
              </div>
            </div>

            <div className="flex-1 h-full p-4">
              <span className="flex items-center justify-between text-orange127a font-medium">
                <span>Reviews:</span>
                <span>
                  <Button
                    type="button"
                    action="addComment"
                    style="blue"
                    icon={PiPlusCircleFill}
                    onClick={() => setNewReview(true)}
                  />
                </span>
              </span>
              <div className="bg-base127b h-full max-h-[390px] w-full gap-3 mt-2 p-3 flex-col flex justify-between overflow-y-scroll rounded-lg">
                {foodItem.reviews.map((review, key) => {
                  return (
                    <div
                      key={key}
                      className={`w-full h-fit py-2  ${
                        key + 1 === currentReviews.length
                          ? ""
                          : "border-b border-base127c"
                      }`}
                    >
                      <span key={key}>
                        <ReviewCard review={review} />
                      </span>
                    </div>
                  );
                })}

                <span className="sticky bottom-[-0.75rem] p-1 bg-base127b">
                  <Pagination
                    currentPage={currentPageReview}
                    totalPages={getTotalPages(
                      reviewPerPage,
                      totalReviews ? totalReviews : 0
                    )}
                    setCurrentPage={setCurrentPageReview}
                  />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className="pointer-events-auto absolute top-0 z-[-1] size-full bg-base127 cursor-pointer opacity-100"
        onClick={() => {
          props.closeModal();
        }}
      ></div>

      {newReview && (
        <AnimatePresence mode="wait">
          <m.span
            key={String(newReview)}
            className="absolute z-[30] flex h-full max-w-full items-center justify-center bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            <ReviewModal
              closeModal={toggleReviewModal}
              setAlertBubble={() => {}}
            />
          </m.span>
        </AnimatePresence>
      )}
    </div>
  );
}
