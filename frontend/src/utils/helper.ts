import api from "../api/api";

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