export interface Restaurant {
  username: string;
  name: string;
  cuisineType: CuisineType;
  branchLocation: string;
  openingHours: string;
  capacity: number;
  createdAt: number;
}

export interface RestaurantPrivate extends Restaurant {
  email: string;
}

export interface RestaurantWithPassword extends RestaurantPrivate {
  password: string;
}

export const enum CuisineType {
  Bakery = 1,
  Dessert = 2,
  FastFood = 3,
  Vegetarian = 4,
  American = 11,
  Chinese = 12,
  French = 13,
  Indian = 14,
  Indonesia = 15,
  Italian = 16,
  Japanese = 17,
  Korean = 18,
  Mexican = 19,
  MiddleEastern = 20,
  Thai = 21,
  Vietnamese = 22,
  Western = 23
}

export interface MenuItem {
  username: string;
  name: string;
  type: string;
  price: number;
  description: string;
  image: string;
  createdAt: number;
}

export interface AvailableSlot {
  username: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  createdAt: number;
}

export interface Tag {
  name: string;
  createdAt: string;
}

export interface RestaurantTag {
  username: string;
  tag: string;
  createdAt: number;
}
