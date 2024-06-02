import api from "../api/api";
import { foodItem, review } from "../models/Models";

/**
 * Function for scrolling to top when changing pages
 */
export function ScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export const validateToken = async () => {
  try {
    const token = sessionStorage.getItem("pb_token");
    if (!token) {
      return { isLoggedIn: false, isAdmin: false };
    }

    /** API Call - check validity of token && if user is admin */
    const response = await api.post("/user/validate-token", null, {
      headers: {
        Authorization: token,
      },
    });

    if (response.data.tokenValid) {
      return { isLoggedIn: true, isAdmin: response.data.isAdmin };
    } else {
      sessionStorage.removeItem("pb_token");
      return { isLoggedIn: false, isAdmin: false };
    }
  } catch (error) {
    console.log("ello");
    sessionStorage.removeItem("pb_token");
    return { isLoggedIn: false, isAdmin: false };
  }
};

/**
 * Function - filter food items via keyword and/or type of food
 */
export const filterFoodItems = (
  keywordFilter: string,
  foodTypeFilter: string,
  foodItems: foodItem[],
  sortOption: string
) => {
  // apply filter
  const filteredItems = foodItems.filter((item) => {
    const matchesType = foodTypeFilter
      ? item.classification === foodTypeFilter
      : true;
    const matchesKeyword = keywordFilter
      ? item.name.toLowerCase().includes(keywordFilter.toLowerCase())
      : true;
    return matchesType && matchesKeyword;
  });

  // sort the filtered items based on the sort option
  const sortedItems = filteredItems.sort((a, b) => {
    if (sortOption === "Price (Low to High)") {
      return a.price - b.price;
    } else if (sortOption === "Price (High to Low)") {
      return b.price - a.price;
    }
    return 0;
  });

  return sortedItems;
};

/**
 * Function to get the month index from the month name
 */
const getMonthIndex = (monthName: string) => {
  return new Date(Date.parse(`${monthName} 1, 2024`)).getMonth();
};

/**
 * Function to filter reviews based on selected month and year
 */
export const filterReviewsByDate = (
  reviewFilter: string,
  reviewArray: review[]
) => {
  if (!reviewFilter) return reviewArray;

  const [selectedMonth, selectedYear] = reviewFilter.split(" ");
  const selectedMonthIndex = getMonthIndex(selectedMonth);

  return reviewArray.filter((review) => {
    const reviewDate = new Date(review.dateModified);
    const reviewMonth = reviewDate.getMonth(); // 0-based month index
    const reviewYear = reviewDate.getFullYear();

    return (
      reviewMonth === selectedMonthIndex &&
      reviewYear === parseInt(selectedYear, 10)
    );
  });
};
