import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { PiPlusCircleFill, PiStarFill } from "react-icons/pi";

import { Button } from "../Button.tsx";
import { foodItem, review } from "../../models/Models.tsx";
import ReviewCard from "../ReviewCard.tsx";
import { ReviewModal } from "./ReviewModal.tsx";
import { AuthPageContext } from "../../pages/AuthPage.tsx";
import { MdEdit } from "react-icons/md";
import { PRFoodItemModal } from "../profile/PRFoodItemModal.tsx";
import api from "../../api/api.ts";
import axios from "axios";
import { FIReviewFilter } from "./FIFilter.tsx";
import { EmptyReviews, FoodItemNotFound } from "../EmptyResults.tsx";

interface FIExpandedViewProps {
  establishmentId: string;
  foodId: string;
  isOwnerRoute: boolean;
  closeModal: () => void;
}

export function FIExpandedView(props: FIExpandedViewProps) {
  const { isLoggedIn } = useContext(AuthPageContext);

  const [foodItem, setFoodItem] = useState<foodItem | null>(null);
  const [foodItemReviews, setFoodItemReviews] = useState<review[]>([]);

  // filter
  const [foodReviewFilter, setFoodReviewFilter] = useState<string>("");

  const [editFoodItem, setEditFoodItem] = useState<boolean>(false);

  /** API Call - fetch details of food item */
  const fetchFoodItem = async () => {
    try {
      const response = await api.get(`/food-items/${props.foodId}`);

      setFoodItem(response.data);
    } catch (error) {
      setFoodItem(null);

      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Cannot fetch food item";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    }
  };

  /** API Call - fetch reviews of establishment */
  const fetchReviews = async () => {
    try {
      const response = await api.get(`/reviews/filtered`, {
        params: {
          foodId: props.foodId,
          monthYear: foodReviewFilter,
        },
      });
      setFoodItemReviews(response.data);
    } catch (error) {
      setFoodItemReviews([]);

      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Cannot fetch food items";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    }
  };

  const [newReview, setNewReview] = useState<boolean>(false);

  /** Function - closes the review modal */
  const toggleReviewModal = () => {
    setNewReview(!newReview);
  };

  /** Function - closes the edit food modal */
  const toggleEditFoodModal = () => {
    setEditFoodItem(!editFoodItem);
  };

  /** useEffect - fetch details of food item */
  useEffect(() => {
    fetchFoodItem();
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** useEffect - fetch details of food item */
  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodReviewFilter]);

  // Disables scroll when modal is opened
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="pointer-events-auto overflow-y-hidden fixed start-0 top-0 z-20 size-full overflow-x-hidden">
      <div className="m-3 mt-0 flex min-h-screen items-center transition-all ease-out sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="pointer-events-auto flex h-fit rounded-xl w-full flex-col border border-base127c bg-base127">
          <div className="flex items-center justify-between border-b border-base127c px-4 py-3">
            {props.isOwnerRoute && (
              <span
                className="cursor-pointer"
                onClick={() => setEditFoodItem(!editFoodItem)}
              >
                <MdEdit />
              </span>
            )}

            <h3 className="flex w-full justify-center text-xl font-semibold text-green0">
              {foodItem ? (
                foodItem.name
              ) : (
                <span className="text-red127">Food item not found</span>
              )}
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

          {foodItem ? (
            <>
              <div className="flex-1 flex gap-3 text-orange127c justify-between items-start max-h-[75px] p-4">
                <div className="flex items-center flex-1 flex-col">
                  <span className="text-sm font-light">Price:</span>
                  <span>₱ {foodItem.price}</span>
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
                  <span className="flex gap-2">
                    <FIReviewFilter
                      filterApplied={foodReviewFilter}
                      setFilterApplied={setFoodReviewFilter}
                    />
                    {isLoggedIn && !props.isOwnerRoute && (
                      <span>
                        <Button
                          type="button"
                          action="addComment"
                          style="blue"
                          icon={PiPlusCircleFill}
                          onClick={() => setNewReview(true)}
                        />
                      </span>
                    )}
                  </span>
                </span>
                <div className="bg-base127b h-full min-h-[300px] max-h-[390px] w-full gap-3 mt-2 p-3 flex-col flex justify-start overflow-y-auto rounded-lg">
                  {foodItemReviews.length > 0 ? (
                    foodItemReviews.map((review, key) => {
                      return (
                        <div
                          key={key}
                          className={`w-full h-fit py-2  ${
                            key + 1 === foodItemReviews.length
                              ? ""
                              : "border-b border-base127c"
                          }`}
                        >
                          <span key={key}>
                            <ReviewCard review={review} />
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <EmptyReviews />
                  )}
                </div>
              </div>
            </>
          ) : (
            <FoodItemNotFound />
          )}
        </div>
      </div>

      <div
        className="pointer-events-auto absolute top-0 z-[-1] size-full bg-base127 cursor-pointer opacity-100"
        onClick={() => {
          props.closeModal();
        }}
      ></div>

      {isLoggedIn && props.isOwnerRoute && editFoodItem && foodItem && (
        <AnimatePresence mode="wait">
          <m.span
            key={String(editFoodItem)}
            className="absolute z-[30] flex h-full max-w-full items-center justify-center bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            <PRFoodItemModal
              action="edit"
              closeModal={toggleEditFoodModal}
              foodItem={foodItem}
            />
          </m.span>
        </AnimatePresence>
      )}

      {isLoggedIn && !props.isOwnerRoute && newReview && (
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
              foodItemId={props.foodId}
              action="add"
              closeModal={toggleReviewModal}
            />
          </m.span>
        </AnimatePresence>
      )}
    </div>
  );
}
