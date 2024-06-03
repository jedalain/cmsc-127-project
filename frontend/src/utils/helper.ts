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

export const validateToken = () => {
  try {
    const token = sessionStorage.getItem("tt_token");
    if (!token) {
      return { isLoggedIn: false };
    }
    return { isLoggedIn: true };
  } catch (error) {
    sessionStorage.removeItem("tt_token");
    return { isLoggedIn: false };
  }
};

export const validateTokenForAdmin = async () => {
  try {
    const token = sessionStorage.getItem("tt_token");
    if (!token) {
      return { isAdmin: false };
    }

    const response = await api.post("/users/check-admin", null, {
      headers: {
        Authorization: token,
      },
    });

    console.log(response);
    return { isAdmin: response.data.isAdmin };
  } catch (error) {
    sessionStorage.removeItem("tt_token");
    return { isLoggedIn: false };
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

export const generateFilterByMonthYear = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthYearArray = [];

  for (let year = 2020; year <= currentYear; year++) {
    const startMonth = year === 2020 ? 1 : 0; // start from January 2020
    const endMonth = year === currentYear ? currentMonth : 12; // ends at current month if it's the current year, otherwise end at December

    for (let month = startMonth; month < endMonth; month++) {
      const monthName = monthNames[month];
      monthYearArray.push(`${monthName} ${year}`);
    }
  }
  monthYearArray.reverse();

  return monthYearArray;
};

/**
 *
 * Function - converts given words in the format "WORD_WORD" to title case
 *
 */
export const convertToTitleCase = (string: string) => {
  return string
    .toLowerCase()
    .split("_")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
