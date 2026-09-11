import { useState } from "react";
import BurgerControls from "../components/BurgerBuilder/BurgerControls";
import BurgerPreview from "../components/BurgerBuilder/BurgerPreview";
import OrderSummary from "../components/BurgerBuilder/OrderSummary";

const initialBurger = {
  bunIndex: 0,
  bottomBunIndex: 0,
  pattyIndex: 1,
  pattyQuantity: 1,
  cheeseIndex: 0,
  cheeseQuantity: 1,
  onionTypeIndex: 0,
  sauceIndex: 0,
  sauceQuantity: 1,
  toppings: { Lettuce: 1, Tomato: 1, Onion: 1, Pickles: 0, Jalapeño: 0, Bacon: 0 },
};

const BuildBurger = ({ onCartChange }) => {
  const [burger, setBurger] = useState(initialBurger);

  const addToCart = () => onCartChange(count => count + 1);
  const clearBurger = () => setBurger(initialBurger);

  return (
    <main className="page-shell">
      <div className="builder-grid">
        <BurgerControls burger={burger} setBurger={setBurger} />
        <BurgerPreview burger={burger} />
        <OrderSummary burger={burger} onAddToCart={addToCart} onClear={clearBurger} />
      </div>
    </main>
  );
};

export default BuildBurger;
