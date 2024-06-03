import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  PiPlusCircle,
  PiPlusCircleFill,
  PiStarFill,
  PiTrashFill,
} from "react-icons/pi";
import { AnimatePresence, motion as m } from "framer-motion";

import { foodEstablishment, foodItem, review } from "../../models/Models.tsx";
import ReviewCard from "../ReviewCard.tsx";
import FoodCard from "./ESTFoodCard.tsx";
import { Pagination } from "../Pagination.tsx";
import { Button } from "../Button.tsx";
import { ReviewModal } from "./ReviewModal.tsx";
import { FIExpandedView } from "./FIExpandedView.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack, MdEdit } from "react-icons/md";
import { FIFilter } from "./FIFilter.tsx";
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
import {
  deleteEstablishment,
  deleteFoodItem,
  deleteReview,
} from "../../utils/admin.ts";

interface ESTExpandedViewProps {
  establishmentId?: string;
}

export default function ESTExpandedView(props: ESTExpandedViewProps) {
  const { isLoggedIn, isAdmin } = useContext(AuthPageContext);
  const navigate = useNavigate();

  // for getting establishment id
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const establishmentId = searchParams.get("id") || props.establishmentId || "";

  const [establishment, setEstablishment] =
    useState<foodEstablishment | null>();
  const [foodItems, setFoodItems] = useState<foodItem[]>([]);
  const [estReviews, setEstReviews] = useState<review[]>([]);

  // filter for reviews
  const [reviewFilterApplied, setReviewFilterApplied] = useState<string>("");

  // filter for food items in the establishment
  const [foodFilterApplied, setFoodFilterApplied] = useState<{
    keyword: string;
    classification: string;
    priceSort: string;
  }>({ keyword: "", classification: "", priceSort: "" });

  // for checking if the owner is the viewer
  const [isOwnerRoute, setIsOwnerRoute] = useState<boolean>(false);

  /** API Call - check if establishment is owned by user */
  const checkOwnership = async () => {
    try {
      const token = sessionStorage.getItem("tt_token");
      const idToCheck = { establishmentId: establishmentId };

      const response = await api.post("/users/check-owner", idToCheck, {
        headers: {
          Authorization: token,
        },
      });
      setIsOwnerRoute(response.data.isOwner);
    } catch (error) {
      setIsOwnerRoute(false);

      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Cannot perform action";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    }
  };

  /** API Call - fetch details of establishment */
  const fetchEstablishment = async () => {
    try {
      const response = await api.get(`/food-establishments/${establishmentId}`);
      setEstablishment(response.data);
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

  /** API Call - fetch food items of establishment */
  const fetchFoodItems = async () => {
    const { keyword, classification, priceSort } = foodFilterApplied;

    try {
      const response = await api.get(
        `/food-items/establishment/${establishmentId}`,
        {
          params: {
            keyword: keyword,
            classification: classification,
            priceSort: priceSort,
          },
        }
      );
      setFoodItems(response.data);
    } catch (error) {
      setEstablishment(null);

      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Cannot fetch food items";
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
          establishmentId: establishmentId,
          monthYear: reviewFilterApplied,
        },
      });
      setEstReviews(response.data);
    } catch (error) {
      setEstReviews([]);

      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Cannot fetch food items";
      } else {
        message = (error as Error).message;
      }

      console.log(message);
    }
  };

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
    fetchFoodItems();
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

  /** useEffect - updates the displayed food items on the current page */
  useEffect(() => {
    setCurrentFoodItems(paginateFoodItems(foodItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageFood, foodItems]);

  /** useEffect - fetch establishment details on load */
  useEffect(() => {
    fetchEstablishment();
    fetchFoodItems();
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkOwnership();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [establishment]);

  /** useEffect - fetch establishment details on load */
  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewFilterApplied]);

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
            <span className="flex items-start">
              <div className="flex flex-1 flex-col">
                <span className="flex gap-2 items-center font-semibold text-xl">
                  <PiStarFill color="#FDE767" /> {establishment.avgRating}
                </span>
                <span className="text-3xl font-semibold">
                  {establishment.name}
                </span>
                <span className="text-xl font-regular">
                  {establishment.address}
                </span>
              </div>

              {isAdmin && isLoggedIn && (
                <div
                  className="text-red127 hover:text-red127b cursor-pointer transition-all"
                  onClick={() => {
                    deleteEstablishment(establishmentId);
                    navigate("../");
                  }}
                >
                  <PiTrashFill size={30} />
                </div>
              )}
            </span>

            <span className="text-orange127a flex justify-between md:flex-row flex-col -mb-6 items-start font-medium">
              <span>Food items:</span>
            </span>

            <div className="flex flex-1 gap-3 md:flex-row flex-col-reverse">
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
                        <div className="w-full relative h-fit" key={key}>
                          <span className="flex" key={key}>
                            <FoodCard
                              name={food.name}
                              avgRating={food.avgRating}
                              price={food.price}
                              classification={food.classification}
                              openDetailed={() => {
                                setExpandedFoodItem(true);
                                setExpandedFoodItemId(food.foodId);
                              }}
                            />
                          </span>

                          {isAdmin && isLoggedIn && (
                            <div
                              className="text-red127 w-fit absolute top-3 right-3 hover:text-red127b cursor-pointer transition-all"
                              onClick={() => {
                                deleteFoodItem(food.foodId);
                              }}
                            >
                              <PiTrashFill size={24} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : isOwnerRoute && isLoggedIn ? (
                  <div className="h-fit w-full gap-3 min-h-[300px] py-2 items-start justify-center grid-cols-1 grid xs:grid-cols-2 md:grid-cols-4 rounded-lg">
                    <div
                      className="bg-base127b text-base127d h-[150px] w-full cursor-pointer justify-center items-center p-3 rounded-lg flex flex-col transition-all hover:bg-base127b2 active:scale-[0.95]"
                      onClick={() => setNewFoodItem(!newFoodItem)}
                    >
                      <PiPlusCircle size={30} />
                    </div>
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
                />
              </span>
            </div>

            <div className="flex flex-[2] flex-col">
              <span className="flex items-center justify-between text-orange127a font-medium">
                <span>Reviews:</span>
                <span className="flex gap-2">
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
                {estReviews.length > 0 ? (
                  estReviews.map((review, key) => {
                    return (
                      <div
                        key={key}
                        className={`w-full flex h-fit py-2  ${
                          key + 1 === estReviews.length
                            ? ""
                            : "border-b border-base127c"
                        }`}
                      >
                        <span className="flex-1" key={key}>
                          <ReviewCard review={review} />
                        </span>
                        {isAdmin && isLoggedIn && (
                          <div
                            className="text-red127 hover:text-red127b cursor-pointer transition-all"
                            onClick={() => {
                              deleteReview(review.reviewId);
                            }}
                          >
                            <PiTrashFill size={24} />
                          </div>
                        )}
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
                  <ReviewModal
                    establishmentId={establishment.establishmentId}
                    action="add"
                    closeModal={toggleReviewModal}
                  />
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
                    closeModal={toggleFoodItemModal}
                    foodId={expandedFoodItemId}
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
                    action="add"
                    establishmentId={establishment.establishmentId}
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
