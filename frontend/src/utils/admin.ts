import axios from "axios";
import api from "../api/api";

/** API Call - delete existing establishment */
export const deleteEstablishment = async (establishmentId: string) => {
  try {
    const token = sessionStorage.getItem("tt_token");
    await api.delete(`food-establishments/${establishmentId}`, {
      headers: {
        Authorization: token,
      },
    });

    window.location.reload();
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || "Cannot delete review";
    } else {
      message = (error as Error).message;
    }

    console.log(message);
  }
};

/** API Call - delete existing review */
export const deleteReview = async (reviewId: string) => {
  try {
    const token = sessionStorage.getItem("tt_token");
    await api.delete(`/reviews/${reviewId}`, {
      headers: {
        Authorization: token,
      },
    });
    window.location.reload();
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || "Cannot delete review";
    } else {
      message = (error as Error).message;
    }

    console.log(message);
  }
};

/** API Call - delete existing food item */
export const deleteFoodItem = async (foodItemId: string) => {
  try {
    const token = sessionStorage.getItem("tt_token");
    await api.delete(`/food-items/${foodItemId}`, {
      headers: {
        Authorization: token,
      },
    });
    window.location.reload();
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || "Cannot delete food item";
    } else {
      message = (error as Error).message;
    }

    console.log(message);
  }
};
