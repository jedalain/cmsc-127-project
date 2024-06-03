import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  PiArrowsOutSimpleLight,
  PiBowlFoodBold,
  PiStarFill,
  PiStorefrontBold,
} from "react-icons/pi";

import { review } from "../../models/Models.tsx";
import { ReviewModal } from "../feed/ReviewModal.tsx";
import { format, parseISO } from "date-fns";

interface PRReviewsProps {
  reviews: review[];
  setEstablishmentId: Dispatch<SetStateAction<string>>;
}

export default function PRReviews(props: PRReviewsProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [chosenReview, setChosenReview] = useState<review | null>(null);

  /** Function - closes the review modal */
  const toggleModal = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    props.setEstablishmentId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props.reviews.length > 0 ? (
    <div className="h-full w-full gap-3 items-stretch flex flex-col">
      {props.reviews.map((review, index) => {
        return (
          <div key={index} className="w-full h-full flex flex-col gap-3">
            <div className="text-base127d bg-base127b2 flex flex-col text-sm rounded-lg p-3 w-full h-[90px]">
              <span className="flex items-center justify-between font-medium">
                <span className="flex gap-1 items-center">
                  {review.foodId ? (
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
              <div className="text-justify mt-2 text-xs line-clamp-1">
                {format(
                  parseISO(review.dateModified),
                  "MMM d, yyyy HH:mm:ss a"
                )}
              </div>
            </div>
          </div>
        );
      })}

      {expanded && chosenReview && (
        <ReviewModal
          action="edit"
          review={chosenReview}
          closeModal={toggleModal}
        />
      )}
    </div>
  ) : (
    ""
  );
}
