import { useState } from "react";
import {
  PiArrowsOutSimpleLight,
  PiBowlFoodBold,
  PiStarFill,
  PiStorefrontBold,
} from "react-icons/pi";

import {
  establishmentReview,
  foodReview,
  review,
} from "../../models/Models.tsx";
import { ReviewModal } from "../feed/ReviewModal.tsx";

interface PRReviewsProps {
  currentPage: number;
  reviewsPerPage: number;
  filter: string;
}

export default function PRReviews(props: PRReviewsProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [chosenReview, setChosenReview] = useState<review | null>(null);
  const [reviews, setReviews] = useState<review[]>([
    establishmentReview,
    foodReview,
  ]);

  /** Function - closes the review modal */
  const toggleModal = () => {
    setExpanded(!expanded);
  };

  return reviews.length > 0 ? (
    <div className="h-full w-full gap-3 items-stretch flex flex-col">
      {reviews.map((review, index) => {
        return (
          <div key={index} className="w-full h-full flex flex-col gap-3">
            <div className="text-base127d bg-base127b2 flex flex-col text-sm rounded-lg p-3 w-full h-[75px]">
              <span className="flex items-center justify-between font-medium">
                <span className="flex gap-1 items-center">
                  {review.foodItemId ? (
                    <PiBowlFoodBold size={18} />
                  ) : (
                    <PiStorefrontBold size={18} />
                  )}
                  {review.title}
                  <span className="flex pl-3 items-center gap-1 font-normal">
                    <PiStarFill color="#FDE767" /> {review.rating}
                  </span>
                </span>
                <span
                  className="cursor-pointer hover:opacity-70 transition-all active:scale-95"
                  onClick={() => {
                    toggleModal();
                    setChosenReview(review);
                  }}
                >
                  <PiArrowsOutSimpleLight />
                </span>
              </span>

              <div className="text-justify line-clamp-1">{review.comment}</div>
            </div>
          </div>
        );
      })}

      {expanded && chosenReview && (
        <ReviewModal
          action="edit"
          review={chosenReview}
          closeModal={toggleModal}
          setAlertBubble={() => {}}
        />
      )}
    </div>
  ) : (
    ""
  );
}
