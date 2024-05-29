import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your backend URL

// user API
export const addUser = async (user: any) => {
    try {
        const response = await axios.post(`${API_URL}/users/signup`, user);
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};


// food Item API

//get ALL food items
export const getFoodItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/food-items`);
        return response.data;
    } catch (error) {
        console.error('Error fetching food items:', error);
        throw error;
    }
};

// view all food items from an estab
export const getFoodItemsByEstab = async (establishmentId: string) => {
    try {
        const response = await axios.get(`${API_URL}/establishments/${establishmentId}/food-items`);

        return response.data;
    } 
    
    catch (error) {
        console.error('Error fetching food items by establishment:', error);
        throw error;
    }
};

//view all food items from an estab that belongs to a food type
export const getFoodItemsByTypeAndEstablishment = async (establishmentId: string, foodType: string) => {
    try {
        const response = await axios.get(`${API_URL}/establishments/${establishmentId}/food-items/${foodType}`);
        return response.data;

    } 
    catch (error) {
        console.error('Error fetching food items by type and establishment:', error);
        throw error;
    }
};

// add food item
export const addFoodItem = async (foodItem: any) => {
    try {
        const response = await axios.post(`${API_URL}/food-items`, foodItem);
        return response.data;
    } catch (error) {
        console.error('Error adding food item:', error);
        throw error;
    }
};


//update food item
export const updateFoodItem = async (id: string, foodItem: any) => {
    try {
        const response = await axios.put(`${API_URL}/food-items/${id}`, foodItem);
        return response.data;
    } catch (error) {
        console.error('Error updating food item:', error);
        throw error;
    }
};


//delete food item
export const deleteFoodItem = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/food-items/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting food item:', error);
        throw error;
    }
};



// food Establishment API

// view all food estab
export const getFoodEstablishments = async () => {
    try {
        const response = await axios.get(`${API_URL}/food-establishments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching food establishments:', error);
        throw error;
    }
};


//add food estab
export const addFoodEstablishment = async (foodEstablishment: any) => {
    try {
        const response = await axios.post(`${API_URL}/food-establishments`, foodEstablishment);
        return response.data;
    } catch (error) {
        console.error('Error adding food establishment:', error);
        throw error;
    }
};


//update food estab
export const updateFoodEstablishment = async (id: string, foodEstablishment: any) => {
    try {
        const response = await axios.put(`${API_URL}/food-establishments/${id}`, foodEstablishment);
        return response.data;
    } catch (error) {
        console.error('Error updating food establishment:', error);
        throw error;
    }
};


//delete food estab
export const deleteFoodEstablishment = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/food-establishments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting food establishment:', error);
        throw error;
    }
};


// review API

// view all review for specific estab or food
export const getReviewFor = async (reviewFor: string) => { 
    try {
        const response = await axios.get(`${API_URL}/reviews/filtered`, {
            params: { reviewFor }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

// get review by id
export const getReviewById = async (id: string) => {  
    try {
        const response = await axios.get(`${API_URL}/reviews/byId/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching review:', error);
        throw error;
    }
};

// get all review
export const getAllReviews = async () => {
    try {
        const response = await axios.get(`${API_URL}/reviews`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all reviews:', error);
        throw error;
    }
};


// add review
export const addReview = async (review: any) => {
    try {
        const response = await axios.post(`${API_URL}/reviews`, review);
        return response.data;
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
};


//update review
export const updateReview = async (id: string, review: any) => {
    try {
        const response = await axios.put(`${API_URL}/reviews/${id}`, review);
        return response.data;
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};


//delete review
export const deleteReview = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/reviews/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};