import IngredientSelector from "./IngredientSelector";
import ToppingSelector from "./ToppingSelector";
import { buns, bottomBuns, patties, cheeses, toppings, sauces } from "../../data/ingredients";

const BurgerControls = ({ burger, setBurger }) => {
  const cycle = (key, list, direction) => {
    setBurger(prev => ({
      ...prev,
      [key]: direction === "next"
        ? (prev[key] + 1) % list.length
        : (prev[key] - 1 + list.length) % list.length,
    }));
  };

  const setQuantity = (key, amount, min = 0) => {
    setBurger(prev => ({ ...prev, [key]: Math.max(min, prev[key] + amount) }));
  };

  const setNestedQuantity = (group, name, amount) => {
    setBurger(prev => ({
      ...prev,
      [group]: {
        ...prev[group],
        [name]: Math.max(0, prev[group][name] + amount),
      },
    }));
  };

  return (
    <section className="controls-panel">
      <div className="panel-heading">
        <h1>Build Your Burger</h1>
        <p>Choose your ingredients and create your perfect burger</p>
      </div>

      <IngredientSelector
        title="Top Bun"
        ingredient={buns[burger.bunIndex]}
        onPrevious={() => cycle("bunIndex", buns, "previous")}
        onNext={() => cycle("bunIndex", buns, "next")}
      />

      <div className="topping-heading">
        <div className="plus-icon">+</div>
        <div><strong>Add Topping</strong><span>Add extra toppings between bun and cheese</span></div>
        <span className="collapse-icon">⌃</span>
      </div>

      <div className="topping-grid">
        {toppings.map(topping => (
          <ToppingSelector
            key={topping.id}
            topping={topping}
            quantity={burger.toppings[topping.name]}
            onDecrease={() => setNestedQuantity("toppings", topping.name, -1)}
            onIncrease={() => setNestedQuantity("toppings", topping.name, 1)}
          />
        ))}
      </div>

      <IngredientSelector
        title="Cheese"
        ingredient={cheeses[burger.cheeseIndex]}
        onPrevious={() => cycle("cheeseIndex", cheeses, "previous")}
        onNext={() => cycle("cheeseIndex", cheeses, "next")}
        quantity={burger.cheeseQuantity}
        onDecrease={() => setQuantity("cheeseQuantity", -1)}
        onIncrease={() => setQuantity("cheeseQuantity", 1)}
      />

      <IngredientSelector
        title="Patty"
        ingredient={patties[burger.pattyIndex]}
        onPrevious={() => cycle("pattyIndex", patties, "previous")}
        onNext={() => cycle("pattyIndex", patties, "next")}
        quantity={burger.pattyQuantity}
        onDecrease={() => setQuantity("pattyQuantity", -1, 1)}
        onIncrease={() => setQuantity("pattyQuantity", 1, 1)}
        min={1}
      />

      <IngredientSelector
        title="Sauce"
        ingredient={sauces[burger.sauceIndex]}
        onPrevious={() => cycle("sauceIndex", sauces, "previous")}
        onNext={() => cycle("sauceIndex", sauces, "next")}
        quantity={burger.sauceQuantity}
        onDecrease={() => setQuantity("sauceQuantity", -1)}
        onIncrease={() => setQuantity("sauceQuantity", 1)}
      />

      <IngredientSelector
        title="Bottom Bun"
        ingredient={bottomBuns[burger.bottomBunIndex]}
        onPrevious={() => cycle("bottomBunIndex", bottomBuns, "previous")}
        onNext={() => cycle("bottomBunIndex", bottomBuns, "next")}
      />

      <button
        type="button"
        className="reset-button"
        onClick={() => setBurger({
          bunIndex: 0,
          bottomBunIndex: 0,
          pattyIndex: 0,
          pattyQuantity: 1,
          cheeseIndex: 0,
          cheeseQuantity: 1,
          onionTypeIndex: 0,
          sauceIndex: 0,
          sauceQuantity: 1,
          toppings: { Lettuce: 0, Tomato: 0, Onion: 0, Pickles: 0, Jalapeño: 0, Bacon: 0 },
        })}
      >
        ↻ <span>Reset Burger</span>
      </button>
    </section>
  );
};

export default BurgerControls;
