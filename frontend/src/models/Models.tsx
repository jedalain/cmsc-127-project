export interface review {
  reviewId: string;
  title: string;
  comment: string;
  rating: number;
  dateCreated: Date;
  dateModified: Date;
  userId: string;
  establishmentId?: string;
  foodItemId?: string;
}

export interface foodItem {
  foodItemId: string;
  name: string;
  classification: string;
  price: number;
  avgRating: number;
  reviews: review[];
  establishmentId: string;
}

export interface foodEstablishment {
  establishmentId: string;
  name: string;
  address: string;
  avgRating: number;
  foodItems: foodItem[];
  reviews: review[];
  userId: string;
}

export interface user {
  userId: string;
  role: string;
  email: string;
  fname: string;
  mname?: string;
  lname: string;
  establishments: foodEstablishment[];
  reviews: review[];
}

/**
 *
 * SAMPLE DATA
 *
 */

export const foodReview: review = {
  reviewId: "rev123",
  title: "Delicious",
  rating: 4,
  comment: "Great food! Good value for money and great flavor.",
  dateCreated: new Date("05/26/2024"),
  dateModified: new Date("05/26/2024"),
  userId: "aab12",
  foodItemId: "5000",
};

export const establishmentReview: review = {
  reviewId: "rev123",
  title: "Great place",
  rating: 5,
  comment:
    "The ambiance of the place is really nice. The staff were also kind and approachable",
  dateCreated: new Date("05/26/2024"),
  dateModified: new Date("05/26/2024"),
  userId: "aab12",
  establishmentId: "1000",
};

export const establishmentReview2: review = {
  reviewId: "rev123",
  title: "Great place",
  rating: 5,
  comment:
    "The ambiance of the place is really nice. The staff were also kind and approachable",
  dateCreated: new Date("03/26/2024"),
  dateModified: new Date("04/26/2024"),
  userId: "aab12",
  establishmentId: "1000",
};

export const fries: foodItem = {
  foodItemId: "5000",
  name: "French Fries",
  avgRating: 4.89,
  price: 140,
  classification: "Snack",
  reviews: [],
  establishmentId: "1000",
};

export const mcflurry: foodItem = {
  foodItemId: "5001",
  name: "McFlurry",
  avgRating: 4.3,
  price: 50,
  classification: "Dessert",
  reviews: [
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
  ],
  establishmentId: "1000",
};

export const chicken: foodItem = {
  foodItemId: "5002",
  name: "Fried Chicken",
  avgRating: 4.1,
  price: 150,
  classification: "Meat",
  reviews: [],
  establishmentId: "1000",
};

export const mcdo: foodEstablishment = {
  establishmentId: "1000",
  name: "McDonalds",
  avgRating: 4.5,
  foodItems: [fries, mcflurry, chicken, fries, mcflurry],
  reviews: [establishmentReview],
  address: "UPLB Vega Arcade, Los Banos, Laguna 4200",
  userId: "aab12",
};

export const arrayOfReviews: review[] = [
  foodReview,
  foodReview,
  foodReview,
  foodReview,
  foodReview,
  foodReview,
  foodReview,
  foodReview,
  foodReview,
  foodReview,
  foodReview,
  foodReview,
  foodReview,
  foodReview,
  foodReview,
];

export const sampleUser: user = {
  userId: "100",
  role: "owner",
  email: "test@gmail.com",
  fname: "John",
  lname: "Doe",
  establishments: [mcdo, mcdo, mcdo, mcdo],
  reviews: [
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    foodReview,
    establishmentReview,
    establishmentReview,
    establishmentReview,
    establishmentReview,
    establishmentReview,
    establishmentReview,
    establishmentReview,
  ],
};
