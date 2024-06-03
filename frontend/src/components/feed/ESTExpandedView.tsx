import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PiPlusCircle, PiPlusCircleFill } from "react-icons/pi";
import { AnimatePresence, motion as m } from "framer-motion";

import {
  establishmentReview,
  establishmentReview2,
  foodEstablishment,
  foodItem,
  fries,
  mcdo,
  mcflurry,
  review,
} from "../../models/Models.tsx";
import ReviewCard from "../ReviewCard.tsx";
import FoodCard from "./ESTFoodCard.tsx";
import { Pagination } from "../Pagination.tsx";
import { Button } from "../Button.tsx";
import { ReviewModal } from "./ReviewModal.tsx";
import { FIExpandedView } from "./FIExpandedView.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack, MdEdit } from "react-icons/md";
import { FIFilter } from "./FIFilter.tsx";
import { filterReviewsByDate } from "../../utils/helper.ts";
import { AuthPageContext } from "../../pages/AuthPage.tsx";
import { PREstablishmentModal } from "../profile/PREstablishmentModal.tsx";
import { PRFoodItemModal } from "../profile/PRFoodItemModal.tsx";
import api from "../../api/api.ts";
import axios from "axios";
import { ESTReviewFilter } from "./ESTReviewFilter.tsx";
import {
  EmptyFoodItems,
  EmptyReviews,
  EstablishmentNotFound,
} from "../EmptyResults.tsx";

interface ESTExpandedViewProps {
  establishmentId?: string;
}

export default function ESTExpandedView(props: ESTExpandedViewProps) {
  const { isLoggedIn } = useContext(AuthPageContext);
  const navigate = useNavigate();

  // for checking if the owner is the viewer
  const isOwnerRoute = false;

  // for getting establishment id
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const establishmentId =
    searchParams.get("establishmentId") || props.establishmentId || "";

  const [establishment, setEstablishment] = useState<foodEstablishment | null>(
    mcdo
  );
  const [foodItems, setFoodItems] = useState<foodItem[]>([mcflurry, fries]);
  const [foodTypes, setFoodTypes] = useState<string[]>(["Dessert", "Fried"]);
  const [estReviews, setEstReviews] = useState<review[]>([]);

  // for filtering food items in the establishment
  const [foodFilterApplied, setFoodFilterApplied] = useState<{
    keyword: string;
    classification: string;
    priceSort: string;
  }>({ keyword: "", classification: "", priceSort: "" });

  /** Function - updates the state filterApplied */
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFoodFilterApplied((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** Function - updates the price in state filterApplied */
  const changePriceFilter = (price: string) => {
    setFoodFilterApplied((prev) => ({
      ...prev,
      priceSort: prev.priceSort !== price ? price : "",
    }));
  };
  /** Function - updates the classification in state filterApplied */
  const changeClassificationFilter = (classification: string) => {
    setFoodFilterApplied((prev) => ({
      ...prev,
      classification:
        prev.classification !== classification ? classification : "",
    }));
  };

  /** Function - clear applied filter */
  const clearFilter = () => {
    setFoodFilterApplied(() => ({
      keyword: "",
      classification: "",
      priceSort: "",
    }));
  };

  /** Function - apply filter */
  const applyFilter = () => {
    fetchEstablishment();
  };

  // for pagination of food items
  const [currentPageFood, setCurrentPageFood] = useState<number>(1);
  const [currentFoodItems, setCurrentFoodItems] = useState<foodItem[]>([]);
  const totalFoodItems = foodItems.length;
  const foodPerPage = 8;

  /** Function - handles pagination of food items */
  const paginateFoodItems = (filteredItems: foodItem[]) => {
    const startIndex = (currentPageFood - 1) * foodPerPage;
    const endIndex = startIndex + foodPerPage;
    return filteredItems.slice(startIndex, endIndex);
  };

  /** Function - gets the total available pages depending on the items displayed per page and total amount of items */
  const getTotalPages = (maxQtyPerPage: number, totalQty: number) => {
    return Math.ceil(totalQty / maxQtyPerPage);
  };

  /** useEffect - updates the displayed food items on the current page */
  useEffect(() => {
    setCurrentFoodItems(paginateFoodItems(foodItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageFood, foodItems]);

  // for filtering reviews
  const [reviewFilterApplied, setReviewFilterApplied] = useState<string>("");
  const filteredReviews = filterReviewsByDate(reviewFilterApplied, estReviews);

  // food item opened in detailed view
  const [expandedFoodItem, setExpandedFoodItem] = useState<boolean>(false);
  const [expandedFoodItemId, setExpandedFoodItemId] = useState<string>("");

  /** Function - closes the expanded food item modal */
  const toggleFoodItemModal = () => {
    setExpandedFoodItem(!expandedFoodItem);
    setExpandedFoodItemId("");
  };

  const [newReview, setNewReview] = useState<boolean>(false);
  const [newFoodItem, setNewFoodItem] = useState<boolean>(false);
  const [editEstablishment, setEditEstablishment] = useState<boolean>(false);

  /** API Call - fetch details of establishment */
  const fetchEstablishment = async () => {
    const { keyword, classification, priceSort } = foodFilterApplied;

    try {
      const token = sessionStorage.getItem("tt_token");
      const response = await api.get("/", {
        headers: {
          Authorization: token,

          establishmentId: establishmentId,
          keyword: keyword,
          classification: classification,
          priceSort: priceSort,
        },
      });

      setEstablishment(response.data.establishment);
      setFoodItems(response.data.foodItems);
      setFoodTypes(response.data.establishment.foodTypes);
      setEstReviews(response.data.reviews);
    } catch (error) {
      setEstablishment(null);

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

  /** Function - closes the review modal */
  const toggleReviewModal = () => {
    setNewReview(!newReview);
  };

  /** Function - closes the edit establishment modal */
  const toggleEstablishmentModal = () => {
    setEditEstablishment(!editEstablishment);
  };

  /** Function - closes the food item modal */
  const toggleEditFoodItemModal = () => {
    setNewFoodItem(!newFoodItem);
  };

  /** useEffect - fetch establishment details on load */
  useEffect(() => {
    // fetchEstablishment();
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
      {establishment && (
        <div className="flex min-h-screen h-full bg-base127 w-full max-w-[900px] flex-col gap-3 px-9 py-12">
          {!isOwnerRoute && (
            <span
              className="flex items-center gap-1 text-sm text-blue127b hover:text-blue127 transition-all cursor-pointer"
              onClick={() => navigate("/establishments")}
            >
              <MdArrowBack /> Back to feed
            </span>
          )}

          {isOwnerRoute && (
            <span
              className="flex items-center gap-1 text-sm text-blue127b hover:text-blue127 transition-all cursor-pointer"
              onClick={() => setEditEstablishment(!editEstablishment)}
            >
              <MdEdit /> Edit establishment
            </span>
          )}

          <div className="text-black127 h-full w-full flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="text-3xl font-semibold">
                {establishment.name}
              </span>
              <span className="text-xl font-regular">
                {establishment.address}
              </span>
            </div>

            <span className="text-orange127a flex justify-between md:flex-row flex-col -mb-6 items-start font-medium">
              <span>Food items:</span>
            </span>

            <div className="flex flex-1 md:flex-row flex-col-reverse">
              <div className="flex-1">
                {currentFoodItems.length > 0 ? (
                  <div className="h-fit w-full gap-3 min-h-[300px] py-2 items-start justify-center grid-cols-1 grid xs:grid-cols-2 md:grid-cols-4 rounded-lg">
                    {/* add new item */}
                    {isOwnerRoute && isLoggedIn && (
                      <div
                        className="bg-base127b text-base127d h-[150px] w-full cursor-pointer justify-center items-center p-3 rounded-lg flex flex-col transition-all hover:bg-base127b2 active:scale-[0.95]"
                        onClick={() => setNewFoodItem(!newFoodItem)}
                      >
                        <PiPlusCircle size={30} />
                      </div>
                    )}
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
                                setExpandedFoodItemId(food.foodItemId);
                              }}
                            />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyFoodItems />
                )}

                <Pagination
                  currentPage={currentPageFood}
                  totalPages={getTotalPages(foodPerPage, totalFoodItems)}
                  setCurrentPage={setCurrentPageFood}
                />
              </div>

              <span className="z-[0] bg-base127b2 p-3 h-full rounded-lg shadow-md items-center gap-6">
                <FIFilter
                  filterApplied={foodFilterApplied}
                  changeClassificationFilter={changeClassificationFilter}
                  changePriceFilter={changePriceFilter}
                  onChange={handleFilterChange}
                  onApply={applyFilter}
                  onClear={clearFilter}
                  choices={foodTypes}
                />
              </span>
            </div>

            <div className="flex flex-[2] flex-col">
              <span className="flex items-center justify-between text-orange127a font-medium">
                <span>Reviews:</span>
                <span className="flex gap-1">
                  <ESTReviewFilter
                    filterApplied={reviewFilterApplied}
                    setFilterApplied={setReviewFilterApplied}
                  />
                  {isLoggedIn && !isOwnerRoute && (
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
              <div className="bg-base127b h-full max-h-[500px] overflow-y-auto min-h-[300px] w-full gap-3 mt-2 p-5 flex-col flex justify-start rounded-lg">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review, key) => {
                    return (
                      <div
                        key={key}
                        className={`w-full h-fit py-2  ${
                          key + 1 === filteredReviews.length
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

            {/* Modal for establishment review */}
            {isLoggedIn && !isOwnerRoute && newReview && (
              <AnimatePresence mode="wait">
                <m.span
                  key={String(newReview)}
                  className="absolute z-[30] flex h-full max-w-full items-center justify-center bg-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                >
                  <ReviewModal action="add" closeModal={toggleReviewModal} />
                </m.span>
              </AnimatePresence>
            )}

            {/* detailed view of food */}
            {expandedFoodItem && expandedFoodItemId !== "" && (
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
                    isOwnerRoute={isOwnerRoute}
                    closeModal={toggleFoodItemModal}
                    foodItemId={expandedFoodItemId}
                    establishmentId={establishment.establishmentId}
                  />
                </m.span>
              </AnimatePresence>
            )}

            {/* modal for establishment details */}
            {isLoggedIn && isOwnerRoute && editEstablishment && (
              <AnimatePresence mode="wait">
                <m.span
                  key={String(editEstablishment)}
                  className="absolute z-[30] flex h-full max-w-full items-center justify-center bg-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                >
                  <PREstablishmentModal
                    action="edit"
                    closeModal={toggleEstablishmentModal}
                    establishment={establishment}
                  />
                </m.span>
              </AnimatePresence>
            )}

            {/* modal for food item details */}
            {isLoggedIn && isOwnerRoute && newFoodItem && (
              <AnimatePresence mode="wait">
                <m.span
                  key={String(newFoodItem)}
                  className="absolute z-[30] flex h-full max-w-full items-center justify-center bg-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                >
                  <PRFoodItemModal
                    action="edit"
                    closeModal={toggleEditFoodItemModal}
                  />
                </m.span>
              </AnimatePresence>
            )}
          </div>
        </div>
      )}

      {establishment === null && <EstablishmentNotFound />}
    </m.div>
  );
}
