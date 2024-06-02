import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PiBowlFood, PiPlusCircle, PiPlusCircleFill } from "react-icons/pi";
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
import { InputField } from "../InputField.tsx";
import { FIPriceFilter, FITypeFilter } from "./FIFilter.tsx";
import { filterFoodItems, filterReviewsByDate } from "../../utils/helper.ts";
import { AuthPageContext } from "../../pages/AuthPage.tsx";
import { PRCreateEstablishment } from "../profile/PRCreateEstablishment.tsx";
import { PRFoodItemModal } from "../profile/PRFoodItemModal.tsx";
import api from "../../api/api.ts";
import axios from "axios";
import { ESTReviewFilter } from "./ESTReviewFilter.tsx";
import { EmptyFoodItems, EstablishmentNotFound } from "../EmptyResults.tsx";

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
  const [estReviews, setEstReviews] = useState<review[]>([
    establishmentReview,
    establishmentReview2,
  ]);

  // for pagination of food items
  const [currentPageFood, setCurrentPageFood] = useState<number>(1);
  const [currentFoodItems, setCurrentFoodItems] = useState<foodItem[]>([]);
  const totalFoodItems = foodItems.length;
  const foodPerPage = 8;

  // for filtering food items in the establishment
  const [searchInput, setSearchInput] = useState<string>("");
  const [foodTypeFilter, setFoodTypeFilter] = useState<string>("");
  const [foodPriceFilter, setFoodPriceFilter] = useState<string>("");

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
    try {
      const token = sessionStorage.getItem("tt_token");
      const response = await api.get("/", {
        headers: {
          Authorization: token,

          establishmentId: establishmentId,
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

  /** Function - updates the searchInput state with current value entered in search bar */
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  /** Function - handles pagination of food items */
  const paginateFoodItems = (filteredItems: foodItem[]) => {
    const startIndex = (currentPageFood - 1) * foodPerPage;
    const endIndex = startIndex + foodPerPage;
    return filteredItems.slice(startIndex, endIndex);
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

  /** Function - gets the total available pages depending on the items displayed per page and total amount of items */
  const getTotalPages = (maxQtyPerPage: number, totalQty: number) => {
    return Math.ceil(totalQty / maxQtyPerPage);
  };

  /** useEffect - updates the displayed food items on the current page */
  useEffect(() => {
    const filteredItems = filterFoodItems(
      searchInput,
      foodTypeFilter,
      foodItems,
      foodPriceFilter
    );
    setCurrentFoodItems(paginateFoodItems(filteredItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    foodTypeFilter,
    foodPriceFilter,
    searchInput,
    currentPageFood,
    foodItems,
  ]);

  /** useEffect - fetch establishment details on load */
  useEffect(() => {
    fetchEstablishment();
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

            <div className="flex flex-1 flex-col">
              <span className="text-orange127a flex justify-between md:flex-row flex-col items-center py-2 font-medium">
                <span>Food items:</span>
                <span className="z-[0] flex items-center gap-6">
                  <FIPriceFilter
                    choices={["Price (Low to High)", "Price (High to Low)"]}
                    filterApplied={foodPriceFilter}
                    setFilterApplied={setFoodPriceFilter}
                  />
                  <FITypeFilter
                    choices={foodTypes}
                    filterApplied={foodTypeFilter}
                    setFilterApplied={setFoodTypeFilter}
                  />
                  <InputField
                    name="search"
                    icon={PiBowlFood}
                    placeholder="Find a food"
                    onChange={handleSearchInput}
                    type="text"
                  />
                </span>
              </span>

              <div className="h-fit w-full gap-3 py-2 items-start justify-center grid-cols-1 grid xs:grid-cols-2 md:grid-cols-4 rounded-lg">
                {/* add new item */}
                {isOwnerRoute && isLoggedIn && (
                  <div
                    className="bg-base127b text-base127d h-[150px] w-full cursor-pointer justify-center items-center p-3 rounded-lg flex flex-col transition-all hover:bg-base127b2 active:scale-[0.95]"
                    onClick={() => setNewFoodItem(!newFoodItem)}
                  >
                    <PiPlusCircle size={30} />
                  </div>
                )}

                {currentFoodItems.length > 0 ? (
                  currentFoodItems.map((food, key) => {
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
                  })
                ) : (
                  <EmptyFoodItems />
                )}
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
              <div className="bg-base127b h-full w-full gap-3 mt-2 p-3 flex-col flex justify-between rounded-lg">
                {filteredReviews.map((review, key) => {
                  return (
                    <div
                      key={key}
                      className={`w-full h-fit py-2  ${
                        key + 1 === estReviews.length
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
                    action="add"
                    closeModal={toggleReviewModal}
                    setAlertBubble={() => {}}
                  />
                </m.span>
              </AnimatePresence>
            )}

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
                  <PRCreateEstablishment
                    action="edit"
                    closeModal={toggleEstablishmentModal}
                    establishment={establishment}
                    setAlertBubble={() => {}}
                  />
                </m.span>
              </AnimatePresence>
            )}

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
