import { ChangeEvent, useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { foodItem, fries, mcflurry } from "../models/Models.tsx";
import { useLocation } from "react-router-dom";
import api from "../api/api.ts";
import axios from "axios";
import { EmptyFoodItems } from "../components/EmptyResults.tsx";
import FoodCard from "../components/feed/ESTFoodCard.tsx";
import { FIFilter } from "../components/feed/FIFilter.tsx";
import { FIExpandedView } from "../components/feed/FIExpandedView.tsx";
import { filterFoodItems } from "../utils/helper.ts";

export default function FoodItemFeed() {
  // for checking if the owner is the viewer
  const isOwnerRoute = false;

  // parameter/s from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || ""; // keyword

  const [foodItems, setFoodItems] = useState<foodItem[]>([mcflurry, fries]);
  const [filteredFoodItems, setFilteredFoodItems] = useState<foodItem[]>([]);
  const [filterApplied, setFilterApplied] = useState<{
    keyword: string;
    classification: string;
    priceSort: string;
  }>({ keyword: keyword, classification: "", priceSort: "" });

  /** API Call - fetch food items from database */
  const fetchFoodItems = async () => {
    try {
      const token = sessionStorage.getItem("tt_token");

      const response = await api.get("/", {
        headers: {
          Authorization: token,
        },
      });

      setFoodItems(response.data.foodItems);
    } catch (error) {
      setFoodItems([]);

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

  /** Function - updates the state filterApplied */
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterApplied((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** Function - updates the price in state filterApplied */
  const changePriceFilter = (price: string) => {
    setFilterApplied((prev) => ({
      ...prev,
      priceSort: prev.priceSort !== price ? price : "",
    }));
  };
  /** Function - updates the classification in state filterApplied */
  const changeClassificationFilter = (classification: string) => {
    setFilterApplied((prev) => ({
      ...prev,
      classification:
        prev.classification !== classification ? classification : "",
    }));
  };

  /** Function - clear applied filter */
  const clearFilter = () => {
    setFilterApplied(() => ({
      keyword: "",
      classification: "",
      priceSort: "",
    }));

    const filteredFoods = filterFoodItems("", "", foodItems, "");
    setFilteredFoodItems(filteredFoods);
  };

  /** Function - apply filter */
  const applyFilter = () => {
    const { keyword, classification, priceSort } = filterApplied;
    const filteredFoods = filterFoodItems(
      keyword,
      classification,
      foodItems,
      priceSort
    );

    setFilteredFoodItems(filteredFoods);
  };

  // food item opened in detailed view
  const [expandedFoodItem, setExpandedFoodItem] = useState<boolean>(false);
  const [expandedFoodItemId, setExpandedFoodItemId] = useState<string>("");
  /** Function - closes the expanded food item modal */
  const toggleFoodItemModal = () => {
    setExpandedFoodItem(!expandedFoodItem);
    setExpandedFoodItemId("");
  };

  useEffect(() => {
    // fetchFoodItems();
    applyFilter();
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
      <div className="flex h-full w-full max-w-[1080px] flex-col gap-3 p-6">
        <div className="flex h-full gap-9 min-h-screen flex-col-reverse md:flex-row">
          <div className="flex-1">
            {filteredFoodItems.length > 0 ? (
              <div className="flex-[3] w-full h-full gap-6 grid grid-cols-1 auto-rows-min xs:grid-cols-2 sm:grid-cols-3">
                {filteredFoodItems.map((food, key) => {
                  return (
                    <div className="h-full w-full" onClick={() => {}}>
                      <span key={key}>
                        <FoodCard
                          name={food.name}
                          price={food.price}
                          classification={food.classification}
                          avgRating={food.avgRating}
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
              <div className="h-screen">
                <EmptyFoodItems />
              </div>
            )}
          </div>

          <span className="md:sticky md:top-6 flex flex-col gap-3 bg-base127b2 h-fit p-3 rounded-lg">
            <span className="text-blue127b">FILTER</span>
            <FIFilter
              choices={["Vegetable", "Dessert"]}
              filterApplied={filterApplied}
              changePriceFilter={changePriceFilter}
              changeClassificationFilter={changeClassificationFilter}
              onChange={handleFilterChange}
              onApply={applyFilter}
              onClear={clearFilter}
            />
          </span>
        </div>
      </div>

      {expandedFoodItem && expandedFoodItemId !== "" && (
        <AnimatePresence mode="wait">
          <m.span
            key={String(expandedFoodItem)}
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
              establishmentId={""}
            />
          </m.span>
        </AnimatePresence>
      )}
    </m.div>
  );
}
