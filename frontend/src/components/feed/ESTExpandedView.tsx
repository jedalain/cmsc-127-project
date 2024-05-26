import { useEffect, useState } from "react";
import { PiPlusCircleFill } from "react-icons/pi";
import { AnimatePresence, motion as m } from "framer-motion";

import { foodEstablishment, foodItem, review } from "../../models/Models.tsx";
import ReviewCard from "../ReviewCard.tsx";
import FoodCard from "./ESTFoodCard.tsx";
import { Pagination } from "../Pagination.tsx";
import { Button } from "../Button.tsx";
import { ReviewModal } from "./ReviewModal.tsx";
import { FIExpandedView } from "./FIExpandedView.tsx";

interface ESTExpandedViewProps {
  foodEstablishment: foodEstablishment;
}

export default function ESTExpandedView(props: ESTExpandedViewProps) {
  const establishment = props.foodEstablishment;

  const [currentPageFood, setCurrentPageFood] = useState<number>(1);
  const [currentPageReview, setCurrentPageReview] = useState<number>(1);
  const [currentFoodItems, setCurrentFoodItems] = useState<foodItem[]>([]);
  const [currentReviews, setCurrentReviews] = useState<review[]>([]);

  const totalFoodItems = establishment.foodItems.length;
  const totalReviews = establishment.reviews.length;
  const foodPerPage = 4;
  const reviewPerPage = 6;

  /** Function - gets the total available pages depending on the items displayed per page and total amount of items */
  const getTotalPages = (maxQtyPerPage: number, totalQty: number) => {
    return Math.ceil(totalQty / maxQtyPerPage);
  };

  /** useEffect - updates the content of currentFoodItems state depending on the current page */
  useEffect(() => {
    setCurrentFoodItems(
      establishment.foodItems.slice(
        (currentPageFood - 1) * foodPerPage,
        currentPageFood * foodPerPage
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageFood]);

  /** useEffect - updates the content of currentReviews state depending on the current page */
  useEffect(() => {
    setCurrentReviews(
      establishment.reviews.slice(
        (currentPageReview - 1) * reviewPerPage,
        currentPageReview * reviewPerPage
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageReview]);

  const [newReview, setNewReview] = useState<boolean>(false);
  const [expandedFoodItem, setExpandedFoodItem] = useState<boolean>(false);

  /** Function - closes the review modal */
  const toggleReviewModal = () => {
    setNewReview(!newReview);
  };

  /** Function - closes the food item modal */
  const toggleFoodItemModal = () => {
    setExpandedFoodItem(!expandedFoodItem);
  };

  return (
    <div className="text-black127 h-full flex flex-col gap-6">
      <div className="flex flex-col">
        <span className="text-3xl font-semibold">{establishment.name}</span>
        <span className="text-xl font-regular">{establishment.address}</span>
      </div>

      <div className="flex flex-1 flex-col">
        <span className="text-orange127a font-medium">Food items:</span>

        <div className="h-fit w-full gap-3 py-2 items-start justify-center grid-cols-1 grid xs:grid-cols-2 md:grid-cols-4 rounded-lg">
          {currentFoodItems.map((food, key) => {
            return (
              <div className="w-full h-fit" key={key}>
                <span key={key}>
                  <FoodCard
                    name={food.name}
                    avgRating={food.avgRating}
                    price={food.price}
                    classification={food.classification}
                    openDetailed={() => {
                      setExpandedFoodItem(true);
                      console.log(expandedFoodItem);
                      console.log(food.foodItemId);
                    }}
                  />
                </span>
              </div>
            );
          })}
        </div>
        <Pagination
          currentPage={currentPageFood}
          totalPages={getTotalPages(foodPerPage, totalFoodItems)}
          setCurrentPage={setCurrentPageFood}
        />
      </div>

      <div className="flex flex-[2] flex-col">
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
        <div className="bg-base127b h-full w-full gap-3 mt-2 p-3 flex-col flex justify-between rounded-lg">
          {establishment.reviews.map((review, key) => {
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

          <Pagination
            currentPage={currentPageReview}
            totalPages={getTotalPages(reviewPerPage, totalReviews)}
            setCurrentPage={setCurrentPageReview}
          />
        </div>
      </div>

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

      {expandedFoodItem && (
        <AnimatePresence mode="wait">
          <m.span
            key={String(newReview)}
            className="absolute z-[30] flex h-full max-w-full items-center justify-center bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            <FIExpandedView
              closeModal={toggleFoodItemModal}
              foodItemId={"1000"}
            />
          </m.span>
        </AnimatePresence>
      )}
    </div>
  );
}
