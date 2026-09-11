import bunImage from "../assets/bun.png";
import bottomBunImage from "../assets/bottom-bun.png";
import pattyImage from "../assets/patty.png";
import cheeseImage from "../assets/cheese.png";
import lettuceImage from "../assets/lettuce.png";
import tomatoImage from "../assets/tomato.png";
import onionImage from "../assets/onion.png";
import picklesImage from "../assets/pickles.png";
import jalapenoImage from "../assets/jalapeno.png";
import baconImage from "../assets/bacon.png";
import sauceImage from "../assets/sauce.png";

export const buns = [
  { id: 1, name: "Sesame Bun", price: 30, calories: 150, image: bunImage },
  { id: 2, name: "Brioche Bun", price: 40, calories: 180, image: bunImage },
  { id: 3, name: "Whole Wheat Bun", price: 35, calories: 140, image: bunImage },
  { id: 4, name: "Potato Bun", price: 35, calories: 160, image: bunImage },
];

export const bottomBuns = [
  { id: 1, name: "Classic Bun", price: 30, calories: 150, image: bottomBunImage },
  { id: 2, name: "Brioche Bun", price: 40, calories: 180, image: bottomBunImage },
  { id: 3, name: "Whole Wheat Bun", price: 35, calories: 140, image: bottomBunImage },
  { id: 4, name: "Potato Bun", price: 35, calories: 160, image: bottomBunImage },
];

export const patties = [
  { id: 1, name: "Beef Patty", price: 80, calories: 250, protein: 25, carbs: 2, fats: 18, image: pattyImage },
  { id: 2, name: "Grilled Chicken Patty", price: 60, calories: 190, protein: 25, carbs: 3, fats: 7, image: pattyImage },
  { id: 3, name: "Veggie Patty", price: 60, calories: 160, protein: 12, carbs: 18, fats: 6, image: pattyImage },
  { id: 4, name: "Crispy Chicken Patty", price: 85, calories: 280, protein: 24, carbs: 15, fats: 15, image: pattyImage },
];

export const cheeses = [
  { id: 1, name: "Cheddar Cheese", price: 25, calories: 80, protein: 5, carbs: 1, fats: 7, image: cheeseImage },
  { id: 2, name: "American Cheese", price: 20, calories: 70, protein: 4, carbs: 2, fats: 6, image: cheeseImage },
  { id: 3, name: "Swiss Cheese", price: 30, calories: 90, protein: 6, carbs: 1, fats: 7, image: cheeseImage },
  { id: 4, name: "Pepper Jack", price: 30, calories: 85, protein: 5, carbs: 1, fats: 7, image: cheeseImage },
];

export const onionTypes = [
  { id: 1, name: "Raw Onion", image: onionImage },
  { id: 2, name: "Grilled Onion", image: onionImage },
  { id: 3, name: "Crispy Onion", image: onionImage },
  { id: 4, name: "Caramelized Onion", image: onionImage },
];

export const toppings = [
  { id: 1, name: "Lettuce", price: 10, calories: 5, protein: 0, carbs: 1, fats: 0, image: lettuceImage },
  { id: 2, name: "Tomato", price: 10, calories: 15, protein: 1, carbs: 3, fats: 0, image: tomatoImage },
  { id: 3, name: "Onion", price: 10, calories: 10, protein: 0, carbs: 2, fats: 0, image: onionImage },
  { id: 4, name: "Pickles", price: 10, calories: 5, protein: 0, carbs: 1, fats: 0, image: picklesImage },
  { id: 5, name: "Jalapeño", price: 15, calories: 5, protein: 0, carbs: 1, fats: 0, image: jalapenoImage },
  { id: 6, name: "Bacon", price: 30, calories: 80, protein: 5, carbs: 0, fats: 7, image: baconImage },
];

export const sauces = [
  { id: 1, name: "BBQ Sauce", price: 10, calories: 35, protein: 0, carbs: 8, fats: 0, image: sauceImage },
  { id: 2, name: "Ketchup", price: 10, calories: 20, protein: 0, carbs: 5, fats: 0, image: sauceImage },
  { id: 3, name: "Mayonnaise", price: 15, calories: 90, protein: 0, carbs: 1, fats: 10, image: sauceImage },
  { id: 4, name: "Mustard", price: 10, calories: 15, protein: 1, carbs: 1, fats: 1, image: sauceImage },
  { id: 5, name: "Chipotle Mayo", price: 20, calories: 80, protein: 0, carbs: 2, fats: 8, image: sauceImage },
];
